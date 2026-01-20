import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): { 
    message: string; 
    endpoints: string[];
    status: string;
  } {
    return { 
      message: 'XBorg Technical Challenge API', 
      status: 'running',
      endpoints: [
        'GET  /health',
        'POST /auth/test-login',
        'GET  /auth/login/google',
        'GET  /auth/validate/google',
        'GET  /user/profile (requires JWT)',
        'PUT  /user/profile (requires JWT)',
      ]
    };
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string } {
    return { 
      status: 'OK', 
      timestamp: new Date().toISOString() 
    };
  }
}
