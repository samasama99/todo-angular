import { AuthService } from "./auth.service";
import { Strategy } from 'passport-local';
import { GetUserDto } from "./dto/get-user.dto";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<GetUserDto>;
}
export {};
