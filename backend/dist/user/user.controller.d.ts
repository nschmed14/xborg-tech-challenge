import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<import("./entities/user.entity").User>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
}
