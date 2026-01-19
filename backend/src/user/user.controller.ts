import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const userId = req.user.sub; // Changed from req.user.id to req.user.sub (JWT standard)
    const user = await this.userService.findById(userId);

    // Return formatted response matching challenge requirements
    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      github_url: user.github_url,
      resume_url: user.resume_url,
      motivation: user.motivation,
      challenge_url: user.challenge_url,
      avatar_url: user.avatar_url,
    };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.user.sub; // Changed from req.user.id to req.user.sub
    const updatedUser = await this.userService.update(userId, updateProfileDto);

    return {
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        full_name: updatedUser.full_name,
        github_url: updatedUser.github_url,
        resume_url: updatedUser.resume_url,
        motivation: updatedUser.motivation,
        challenge_url: updatedUser.challenge_url,
        avatar_url: updatedUser.avatar_url,
      },
    };
  }
}
