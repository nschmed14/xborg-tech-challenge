import { Controller, Get, Put, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('profile')
  getProfile() {
    return { message: 'Get profile endpoint' };
  }

  @Put('profile')
  updateProfile() {
    return { message: 'Update profile endpoint' };
  }
}
