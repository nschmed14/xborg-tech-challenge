import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    const clientID = configService.get('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get('GOOGLE_CALLBACK_URL');
    
    console.log('Google OAuth Config:', { 
      hasClientID: !!clientID,
      hasClientSecret: !!clientSecret,
      callbackURL 
    });
    
    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Missing Google OAuth configuration. Check GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_CALLBACK_URL environment variables.');
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
    console.log('Google OAuth Profile:', profile.id);
    
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
