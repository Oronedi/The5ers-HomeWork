import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<JwtUser>(err: Error, user: JwtUser) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
