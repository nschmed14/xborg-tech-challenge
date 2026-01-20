import { Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth/simple')
export class SimpleTestController {
  constructor(private readonly jwtService: JwtService) {}

  @Get('token')
  getSimpleToken() {
    const testUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
    };

    const token = this.jwtService.sign(testUser);
    
    return {
      access_token: token,
      user: testUser,
      message: 'Simple test token for Railway health checks',
    };
  }

  @Post('login')
  simpleLogin() {
    const testUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
    };

    const token = this.jwtService.sign(testUser);
    
    return {
      access_token: token,
      user: testUser,
      message: 'Simple POST login endpoint',
    };
  }
}