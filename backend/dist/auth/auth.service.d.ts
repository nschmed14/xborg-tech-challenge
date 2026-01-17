import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateGoogleUser(googleUser: {
        email: string;
        firstName: string;
        lastName: string;
        picture: string;
    }): Promise<User>;
    login(user: User): Promise<{
        access_token: string;
        user: User;
    }>;
}
