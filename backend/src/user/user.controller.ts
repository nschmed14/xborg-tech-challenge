import { Controller, Get, Put, Body, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.userId);
  }

  @Put("profile")
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.userId, updateUserDto);
  }
}
