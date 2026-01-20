import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID') || 'dummy-client-id',
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET') || 'dummy-secret',
      callbackURL: configService.get('GOOGLE_CALLBACK_URL') || 'http://localhost:3001/auth/validate/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
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
