import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleProfile: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }) {
    const user = await this.userService.findOrCreate(googleProfile);

    // Generate JWT token
    const payload = {
      sub: user.id,
      email: user.email,
      google_id: user.google_id,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        github_url: user.github_url,
        resume_url: user.resume_url,
        motivation: user.motivation,
        challenge_url: user.challenge_url,
      },
    };
  }

  validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
