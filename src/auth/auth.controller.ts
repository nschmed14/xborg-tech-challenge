import { Controller, Get, Req, Res, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('status')
  getAuthStatus() {
    const clientID = this.configService.get('GOOGLE_CLIENT_ID');
    const callbackURL = this.configService.get('GOOGLE_CALLBACK_URL');
    
    return {
      googleOAuthConfigured: !!(clientID && callbackURL),
      hasClientID: !!clientID,
      clientIDLength: clientID?.length || 0,
      callbackURL,
      frontendURL: process.env.FRONTEND_URL,
    };
  }

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // Initiates the Google OAuth2 login flow
  }

  @Get('validate/google')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      console.log('🔍 Google OAuth callback received');
      console.log('Request user:', req.user);
      
      if (!req.user) {
        console.error('❌ No user returned from Google OAuth');
        throw new Error('Failed to authenticate with Google - no user data returned');
      }
      
      console.log('✓ User authenticated:', req.user.email);
      const result = await this.authService.login(req.user);
      console.log('✓ User logged in, token generated:', result.access_token.substring(0, 20) + '...');
      
      // Determine frontend URL from multiple sources
      let frontendUrl = process.env.FRONTEND_URL;
      
      // If not set or looks like old URL, use the Vercel production URL
      if (!frontendUrl || frontendUrl.includes('frontend-ten-liard')) {
        frontendUrl = 'https://xborg-tech-challenge-rose.vercel.app';
        console.log('Using hardcoded Vercel URL:', frontendUrl);
      }
      
      const userParam = encodeURIComponent(JSON.stringify(result.user));
      const redirectUrl = `${frontendUrl}/auth/callback?token=${result.access_token}&user=${userParam}`;
      
      console.log('✓ Redirecting to:', redirectUrl);
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('❌ Google OAuth callback error:', error.message);
      console.error('Stack:', error.stack);
      let frontendUrl = process.env.FRONTEND_URL;
      if (!frontendUrl || frontendUrl.includes('frontend-ten-liard')) {
        frontendUrl = 'https://xborg-tech-challenge-rose.vercel.app';
      }
      const errorUrl = `${frontendUrl}/auth/signin?error=${encodeURIComponent(error.message)}`;
      console.error('Redirecting to error page:', errorUrl);
      res.redirect(errorUrl);
    }
  }

  @Post('test-login')
  async testLogin(@Res() res: Response) {
    try {
      const result = await this.authService.testLogin();
      return res.json(result);
    } catch (error) {
      console.error('Test login error:', error);
      return res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }
}
