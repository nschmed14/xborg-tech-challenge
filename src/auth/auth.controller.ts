import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('login/google')
  googleLogin() {
    return { message: 'Google login endpoint' };
  }

  @Get('validate/google')
  googleAuthCallback() {
    return { message: 'Google callback endpoint' };
  }
}
