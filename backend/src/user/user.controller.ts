import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req) {
    return this.userService.getProfile(req.user.id);
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.userService.updateProfile(req.user.id, updateProfileDto);
  }
}
