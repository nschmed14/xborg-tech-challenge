import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleProfile: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }) {
    // Find or create user
    let user = await this.userRepository.findOne({
      where: { email: googleProfile.email },
    });

    if (!user) {
      user = this.userRepository.create({
        email: googleProfile.email,
        full_name: googleProfile.name,
        google_id: googleProfile.googleId,
        avatar_url: googleProfile.picture,
      });
      await this.userRepository.save(user);
    }

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

  // Helper method for test login
  async findOrCreateTestUser() {
    let user = await this.userRepository.findOne({
      where: { email: 'test@example.com' },
    });

    if (!user) {
      user = this.userRepository.create({
        email: 'test@example.com',
        full_name: 'Test User',
        google_id: 'test-google-id',
        github_url: 'https://github.com/test',
        resume_url: 'https://example.com/resume',
        motivation: 'I want to join XBorg because I am passionate about AI and fan engagement...',
      });
      await this.userRepository.save(user);
    }

    return user;
  }
}
