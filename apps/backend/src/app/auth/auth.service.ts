import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    try {
      const { username, password, mail }: SignUpDto = signUpDto;

      const [existingUser, existingMail] = await Promise.all([
        this.userModel.findOne({ username }).exec(),
        this.userModel.findOne({ mail }).exec(),
      ]);
      if (existingUser) {
        throw new ConflictException(`שם המשתמש תפוס`);
      }
      if (existingMail) {
        throw new ConflictException(`המייל כבר רשום באתר`);
      }

      const salt: string = await bcrypt.genSalt();
      const hashedPassword: string = await bcrypt.hash(password, salt);

      await this.userModel.create({
        username,
        password: hashedPassword,
        mail,
      });

      this.logger.log(`User ${username} was created successfully`);

      return { message: 'המשתמש נוצר בהצלחה!' };
    } catch (error) {
      if (error.status === 409) {
        this.logger.error(`${error.message}, won't create user`);
        throw error;
      }

      this.logger.error(
        `Failed to create user ${signUpDto.username}: ${error.message}`,
        error.stack
      );
      throw new InternalServerErrorException('שגיאה, המשתמש לא נוצר');
    }
  }

  async login(
    loginDto: LoginDto
  ): Promise<{ message: string; access_token: string }> {
    try {
      const { username, password }: LoginDto = loginDto;

      const user: User = await this.userModel.findOne({ username }).exec();
      if (!user) {
        throw new UnauthorizedException('שם המשתמש או הסיסמה לא נכונים');
      }

      const isPasswordValid: boolean = await bcrypt.compare(
        password,
        user.password
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('שם המשתמש או הסיסמה לא נכונים');
      }

      const accessToken: string = this.jwtService.sign({
        username: user.username,
        sub: user._id,
      });

      this.logger.log(`User ${username} logged in successfully`);

      return { message: 'המשתמש התחבר בהצלחה!', access_token: accessToken };
    } catch (error) {
      this.logger.error(
        `Login failed for user ${loginDto.username}: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }
}
