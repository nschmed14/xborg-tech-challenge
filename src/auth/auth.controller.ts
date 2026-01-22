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
      if (!req.user) {
        console.error('❌ No user returned from Google OAuth');
        throw new Error('Failed to authenticate with Google - no user data returned');
      }
      const result = await this.authService.login(req.user);
      
      // Determine frontend URL from multiple sources
      let frontendUrl = process.env.FRONTEND_URL;
      
      // If not set or looks like old URL, use the Vercel production URL
      if (!frontendUrl || frontendUrl.includes('frontend-ten-liard')) {
        frontendUrl = 'https://xborg-tech-challenge-rose.vercel.app';
      }
      
      const userParam = encodeURIComponent(JSON.stringify(result.user));
      const redirectUrl = `${frontendUrl}/auth/callback?token=${result.access_token}&user=${userParam}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('❌ Google OAuth callback error:', error.message);
      console.error('Stack:', error.stack);
      let frontendUrl = process.env.FRONTEND_URL;
      if (!frontendUrl || frontendUrl.includes('frontend-ten-liard')) {
        frontendUrl = 'https://xborg-tech-challenge-rose.vercel.app';
      }
      const errorUrl = `${frontendUrl}/auth/signin?error=${encodeURIComponent(error.message)}`;
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

  @Get('debug/oauth')
  debugOAuth() {
    const clientID = this.configService.get('GOOGLE_CLIENT_ID');
    const callbackURL = this.configService.get('GOOGLE_CALLBACK_URL');
    const frontendUrl = process.env.FRONTEND_URL;
    
    return {
      message: 'OAuth Debug Information',
      googleOAuthSetup: {
        clientIdConfigured: !!clientID,
        clientIdLength: clientID?.length || 0,
        callbackURL: callbackURL || 'Not set (will be auto-generated)',
        frontendURL: frontendUrl || 'Not set (using fallback)',
      },
      expectedFlow: {
        step1: 'Frontend user clicks "Sign in with Google"',
        step2: 'Frontend redirects to: https://xborg-tech-challenge-production.up.railway.app/auth/login/google',
        step3: 'Backend redirects to Google OAuth page',
        step4: 'User authenticates with Google',
        step5: 'Google redirects back to callback URL',
        step6: 'Backend validates token and generates JWT',
        step7: 'Backend redirects to frontend callback with token and user data',
        step8: 'Frontend stores token and redirects to profile',
      },
      googleConsoleChecklist: {
        redirectUriConfigured: 'https://xborg-tech-challenge-production.up.railway.app/auth/validate/google',
        authorizedJavaScriptOrigins: [
          'http://localhost:3000',
          'https://xborg-tech-challenge-rose.vercel.app',
        ],
      },
    };
  }
}

