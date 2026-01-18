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
        `http://localhost:3000/auth/callback?token=${result.access_token}&user=${encodeURIComponent(JSON.stringify(result.user))}`,
      );
    } catch (error) {
      res.redirect(`http://localhost:3000/auth/error?message=${encodeURIComponent(error.message)}`);
    }
  }

  @Get('test/login')
  async testLogin(@Res() res: Response) {
    // For testing without Google OAuth in Codespaces
    const testUser = {
      email: 'test@example.com',
      id: '12345',
      displayName: 'Test User - Codespaces',
      photos: [{ value: '' }]
    };
    
    try {
      const result = await this.authService.validateGoogleUser(testUser);
      res.redirect(`http://localhost:3000/auth/callback?token=${result.access_token}&user=${encodeURIComponent(JSON.stringify(result.user))}`);
    } catch (error) {
      console.error('Test login error:', error);
      res.status(500).json({ error: 'Test login failed', details: error.message });
    }
  }
}