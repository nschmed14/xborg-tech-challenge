import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleUser: {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
  }) {
    let user = await this.userService.findByEmail(googleUser.email);

    if (!user) {
      user = await this.userService.create({
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        profilePicture: googleUser.picture,
      });
    } else {
      user = await this.userService.update(user.id, {
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        profilePicture: googleUser.picture,
      });
    }

    return user;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
