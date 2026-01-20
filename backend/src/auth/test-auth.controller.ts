import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth/test')
export class TestAuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('login')
  async testLogin(@Res() res: Response) {
    try {
      // Create or get test user using AuthService
      const user = await this.authService.findOrCreateTestUser();

      // Generate token
      const payload = { sub: user.id, email: user.email };
      const token = this.authService.validateToken
        ? 'test_jwt_token_' + Date.now() // Fallback if JWT not available
        : null;

      // Get frontend URL from environment
      const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
      
      const userData = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      };

      console.log(`Test login successful, redirecting to: ${frontendUrl}`);

      // If we have a token service, use it properly
      let redirectUrl = `${frontendUrl}/auth/callback?user=${encodeURIComponent(JSON.stringify(userData))}`;
      if (token) {
        redirectUrl += `&token=${token}`;
      }

      // Redirect to frontend
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('Test login error:', error);
      const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/signin?error=test_login_failed`);
    }
  }
}
