import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GetUserDto } from './dto/get-user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: GetUserDto): Promise<{
        access_token: string;
    }>;
}
