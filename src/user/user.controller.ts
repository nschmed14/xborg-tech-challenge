import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req) {
    return this.userService.getProfile(req.user.userId);
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Request() req, @Body() updateData: any) {
    return this.userService.updateProfile(req.user.userId, updateData);
  }
}
