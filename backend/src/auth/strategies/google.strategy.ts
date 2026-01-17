import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') || 'test-client-id',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') || 'test-client-secret',
      callbackURL: 'http://localhost:3001/auth/validate/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;
    const displayName = name.givenName + ' ' + name.familyName;
    
    const user = await this.authService.validateOAuthLogin({
      email: emails[0].value,
      displayName: displayName,
      id: id,
    });
    
    done(null, user);
  }
}
