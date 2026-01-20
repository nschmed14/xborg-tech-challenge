import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello() {
    return {
      message: 'XBorg Backend API',
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: this.configService.get('NODE_ENV') || 'development',
      endpoints: {
        auth: {
          google_login: 'GET /auth/login/google',
          test_login: 'GET /auth/test/login (for testing)',
          google_validate: 'GET /auth/validate/google',
          simple_token: 'GET /auth/simple/token'
        },
        user: {
          profile: 'GET /user/profile (protected)',
          update_profile: 'PUT /user/profile (protected)'
        },
        health: 'GET /health'
      }
    };
  }

  @Get('health')
  getHealth() {
    return {
      status: 'healthy',
      service: 'xborg-backend',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      node_version: process.version
    };
  }
}