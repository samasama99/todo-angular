import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from 'passport-local';
import { GetUserDto } from "./dto/get-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<GetUserDto> {
    return this.authService.validateUser(username, password)
      .then(user => {
        if (!user) throw new UnauthorizedException();
        return user;
      });
  }
}
