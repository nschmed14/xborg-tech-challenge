import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
}
