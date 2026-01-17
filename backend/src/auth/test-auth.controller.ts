import { Controller, Get, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class TestAuthController {
  constructor(private jwtService: JwtService) {}

  @Get('test-login')
  testLogin(@Res() res: Response) {
    // Create a test user
    const testUser = {
      id: 1,
      email: 'test@example.com',
      fullName: 'Test User',
    };
    
    // Create JWT token
    const payload = { email: testUser.email, sub: testUser.id };
    const token = this.jwtService.sign(payload);
    
    // Redirect to frontend with token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(frontendUrl + '/auth/callback?token=' + token);
  }
}
