import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('=== OAuth Request Debug ===');
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Query params:', req.query);
    console.log('Headers:', {
      host: req.headers.host,
      referer: req.headers.referer,
      'user-agent': req.headers['user-agent']
    });
    console.log('===========================');
    
    // Also log response
    const originalSend = res.send;
    res.send = function(body) {
      console.log('Response Status:', res.statusCode);
      if (res.statusCode >= 400) {
        console.log('Error Response:', body);
      }
      return originalSend.call(this, body);
    };
    
    next();
  }
}
