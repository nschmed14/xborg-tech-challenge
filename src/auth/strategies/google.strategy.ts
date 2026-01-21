import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
    let callbackURL = configService.get('GOOGLE_CALLBACK_URL');
    
    // Auto-generate callback URL if not provided
    if (!callbackURL) {
      // Try to use the Railway or configured URL first
      const railwayUrl = 'https://xborg-tech-challenge-production.up.railway.app';
      callbackURL = `${railwayUrl}/auth/validate/google`;
      console.log('Auto-generated GOOGLE_CALLBACK_URL:', callbackURL);
    }
    
    console.log('=== Google OAuth Configuration ===');
    console.log('Client ID present:', !!clientID);
    console.log('Client Secret present:', !!clientSecret);
    console.log('Callback URL:', callbackURL);
    console.log('===============================');
    
    if (!clientID || !clientSecret) {
      throw new Error('Missing Google OAuth configuration. Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.');
    }
    
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
      passReqToCallback: false,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    console.log('Google OAuth Profile received:', profile.id);
    
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      full_name: `${name.givenName} ${name.familyName}`,
      avatar_url: photos[0]?.value,
      google_id: profile.id,
      access_token: accessToken,
    };
    
    done(null, user);
  }
}
