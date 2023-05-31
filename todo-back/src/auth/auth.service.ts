import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { };

  async validateUser(username: string, password: string): Promise<any> {
    return this.userService.findAll()
      .then(users => users.find(user => user.name == username))
      .then(user => {

        if (!user) throw new NotFoundException();

        if (user.password == password) {
          const { password, ...rest } = user;
          return rest;
        }

        return null;
      })

  }

  async login(user: GetUserDto) {
    const payload = { name: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, { secret: `${process.env.JWT_KEY}` }),
    }
  }
}
