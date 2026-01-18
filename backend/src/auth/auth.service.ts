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

  async validateGoogleUser(googleUser: any): Promise<any> {
    const { googleId, email, full_name, avatar_url } = googleUser;

    let user = await this.userRepository.findOne({
      where: [{ google_id: googleId }, { email }],
    });

    if (!user) {
      user = this.userRepository.create({
        google_id: googleId,
        email,
        full_name,
        avatar_url,
      });
    } else {
      user.google_id = googleId;
      user.avatar_url = avatar_url;
      if (!user.full_name && full_name) {
        user.full_name = full_name;
      }
    }

    await this.userRepository.save(user);

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
      },
    };
  }

  generateJwtToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
