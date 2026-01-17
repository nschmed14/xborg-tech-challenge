import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateOAuthLogin(profile: any): Promise<any> {
    // Handle different profile structures
    const email = profile.email || profile.emails?.[0]?.value;
    const displayName = profile.displayName || 
                       (profile.firstName && profile.lastName ? 
                        `${profile.firstName} ${profile.lastName}` : 
                        'User');
    const googleId = profile.id || profile.googleId;

    if (!email) {
      throw new Error('Email is required for OAuth login');
    }

    let user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      user = this.usersRepository.create({
        email,
        fullName: displayName,
        googleId,
      });
      await this.usersRepository.save(user);
    }

    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
