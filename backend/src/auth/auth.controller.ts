import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // Initiates Google OAuth flow
  }

  @Get('validate/google')
  @UseGuards(AuthGuard('google'))
  async googleValidate(@Req() req: Request, @Res() res: Response) {
    // The user is already validated by the GoogleStrategy
    // Just need to create/update in database and issue JWT
    const user = await this.authService.validateOAuthLogin(req.user);
    const token = await this.authService.login(user);
    
    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = frontendUrl + '/auth/callback?token=' + token.access_token;
    res.redirect(redirectUrl);
  }
}
