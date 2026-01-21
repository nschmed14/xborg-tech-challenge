import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('test')
export class TestController {
  constructor(private configService: ConfigService) {}

  @Get('config')
  getConfig() {
    const config = {
      GOOGLE_CLIENT_ID: this.configService.get('GOOGLE_CLIENT_ID'),
      GOOGLE_CLIENT_SECRET: this.configService.get('GOOGLE_CLIENT_SECRET') ? 'SET (hidden)' : 'MISSING',
      GOOGLE_CALLBACK_URL: this.configService.get('GOOGLE_CALLBACK_URL'),
      FRONTEND_URL: this.configService.get('FRONTEND_URL'),
      NODE_ENV: this.configService.get('NODE_ENV'),
      JWT_SECRET: this.configService.get('JWT_SECRET') ? 'SET' : 'MISSING',
    };
    
    // Build test OAuth URL
    const params = new URLSearchParams({
      client_id: config.GOOGLE_CLIENT_ID || '',
      redirect_uri: config.GOOGLE_CALLBACK_URL || '',
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
    });
    
    return {
      ...config,
      testOAuthUrl: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
      status: config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET && config.GOOGLE_CALLBACK_URL 
        ? 'CONFIGURED' 
        : 'INCOMPLETE',
      message: 'Go to /test/oauth to try direct OAuth',
    };
  }

  @Get('oauth')
  redirectToGoogle() {
    const clientID = this.configService.get('GOOGLE_CLIENT_ID');
    const callbackURL = this.configService.get('GOOGLE_CALLBACK_URL');
    
    if (!clientID || !callbackURL) {
      return { error: 'Missing configuration' };
    }
    
    const params = new URLSearchParams({
      client_id: clientID,
      redirect_uri: callbackURL,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
    });
    
    return { redirectUrl: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}` };
  }
}
