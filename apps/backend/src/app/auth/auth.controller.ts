import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ message: string }> {
    return this.authService.login(loginDto);
  }
}
