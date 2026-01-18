import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth/simple')
export class SimpleTestController {
  constructor(private authService: AuthService) {}

  @Get('token')
  async getToken() {
    // Simple token response for testing
    return { 
      token: 'test-token-123',
      message: 'Use this token for testing: Bearer test-token-123'
    };
  }
}
