import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("login/google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
    // Initiates the Google OAuth flow
  }

  @Get("validate/google")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = await this.authService.validateGoogleUser(req.user);
    const { access_token } = await this.authService.login(user);

    res.redirect(
      `http://localhost:3000/auth/callback?token=${access_token}`,
    );
  }
}
