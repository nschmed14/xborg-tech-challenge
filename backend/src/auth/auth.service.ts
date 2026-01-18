import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,  // This should be UserService
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(profile: any) {
    const user = await this.userService.findOrCreate(profile);
    
    const payload = {
      sub: user.id.toString(),
      email: user.email,
      name: user.full_name,
    };
    
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
}