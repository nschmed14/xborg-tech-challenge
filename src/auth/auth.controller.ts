import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // Initiates the Google OAuth2 login flow
  }

  @Get('validate/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const result = await this.authService.login(req.user);
    
    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth/callback?token=${result.access_token}`);
  }

  @Post('test-login')
  async testLogin(@Res() res: Response) {
    try {
      const result = await this.authService.testLogin();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }
}
