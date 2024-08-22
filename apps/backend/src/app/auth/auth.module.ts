import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserSchema } from './schemas/user.schema';
import { AuthService } from './auth.service';
import { JWT_EXPIRY_TIME, JWT_SECRET } from '../../environment';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRY_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [MongooseModule],
})
export class AuthModule {}
