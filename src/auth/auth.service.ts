import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(userData: any) {
    // Create or update user in database
    const user = await this.userService.createOrUpdate({
      email: userData.email,
      full_name: userData.full_name,
      avatar_url: userData.avatar_url,
      google_id: userData.google_id,
    });

    const payload = { email: user.email, sub: user.id };
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

  async testLogin() {
    // Test user for development
    const testUserData = {
      email: 'test@example.com',
      full_name: 'Test User',
      avatar_url: 'https://via.placeholder.com/150',
    };
    
    // Create or get test user
    const user = await this.userService.createOrUpdate(testUserData);
    
    const payload = { email: user.email, sub: user.id };
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
