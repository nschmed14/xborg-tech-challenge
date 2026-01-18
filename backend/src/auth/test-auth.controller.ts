import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('auth/test')
export class TestAuthController {
  constructor(
    private authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  @Get('login')
  async testLogin(@Res() res: Response) {
    try {
      // Create or get test user
      let user = await this.userRepository.findOne({
        where: { email: 'test@example.com' },
      });

      if (!user) {
        user = this.userRepository.create({
          email: 'test@example.com',
          full_name: 'Test User',
          google_id: 'test-google-id',
        });
        await this.userRepository.save(user);
      }

      // Generate token
      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload);
      
      // Redirect to frontend WITH CORRECT URL
      const userData = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      };
      
      console.log('Test login successful, redirecting to frontend...');
      
      // Use YOUR frontend URL
      res.redirect(
        `https://turbo-zebra-946g554gq693pq46-3000.app.github.dev/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`,
      );
    } catch (error) {
      console.error('Test login error:', error);
      res.redirect(`https://turbo-zebra-946g554gq693pq46-3000.app.github.dev/auth/signin?error=test_login_failed`);
    }
  }
}
