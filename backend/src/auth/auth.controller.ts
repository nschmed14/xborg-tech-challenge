import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Initiates Google OAuth flow
  }

  @Get('validate/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any, @Res() res: Response) {
    try {
      const result = await this.authService.validateGoogleUser(req.user);

      // Redirect to frontend with token
      res.redirect(
        `${process.env.FRONTEND_URL}/auth/callback?token=${result.access_token}&user=${encodeURIComponent(JSON.stringify(result.user))}`,
      );
    } catch (error) {
      res.redirect(
        `${process.env.FRONTEND_URL}/auth/error?message=${encodeURIComponent(error.message)}`,
      );
    }
  }

  @Get('test/login')
  async testLogin(@Res() res: Response) {
    // For testing without Google OAuth in Codespaces
    const testUser = {
      googleId: 'test_12345',
      email: 'test@example.com',
      name: 'Test User - Codespaces',
      picture: '',
    };

    try {
      const result = await this.authService.validateGoogleUser(testUser);
      res.redirect(
        `${process.env.FRONTEND_URL}/auth/callback?token=${result.access_token}&user=${encodeURIComponent(JSON.stringify(result.user))}`,
      );
    } catch (error) {
      console.error('Test login error:', error);
      res
        .status(500)
        .json({ error: 'Test login failed', details: error.message });
    }
  }
}
