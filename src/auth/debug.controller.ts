import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth/debug')
export class DebugController {
  constructor(private configService: ConfigService) {}

  @Get('google-config')
  getGoogleConfig() {
    const clientID = this.configService.get('GOOGLE_CLIENT_ID');
    const callbackURL = this.configService.get('GOOGLE_CALLBACK_URL');
    
    // Build the exact Google OAuth URL
    const params = new URLSearchParams({
      client_id: clientID,
      redirect_uri: callbackURL,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
    });
    
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    
    return {
      configured: !!(clientID && callbackURL),
      clientID: clientID ? `${clientID.substring(0, 20)}...` : 'missing',
      callbackURL,
      encodedCallbackURL: encodeURIComponent(callbackURL || ''),
      googleOAuthUrl,
      instructions: 'Compare the callbackURL above with what is in Google Cloud Console',
    };
  }
  
  @Get('test-redirect')
  testRedirect(@Res() res: Response) {
    const clientID = this.configService.get('GOOGLE_CLIENT_ID');
    const callbackURL = this.configService.get('GOOGLE_CALLBACK_URL');
    
    if (!clientID || !callbackURL) {
      return res.status(500).send('Google OAuth not configured');
    }
    
    // Simple redirect without Passport for testing
    const params = new URLSearchParams({
      client_id: clientID,
      redirect_uri: callbackURL,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
    });
    
    res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  }
}
