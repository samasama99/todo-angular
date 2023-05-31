import { Controller, Get, Post, Redirect, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
@ApiTags('App')
export class AppController {

  constructor(private authService: AuthService) { }

  @ApiQuery({ name: 'username' })
  @ApiQuery({ name: 'password' })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    console.log(req.user)
    console.log(process.env.JWT_KEY)
    return this.authService.login({
      id: req.user.id,
      name: req.user.name
    })
  }

  @Get()
  @Redirect('api')
  @ApiOkResponse({ 'description': 'redirection to /api' })
  getApi() { }

  @Get('hello')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getHello(@Request() req) {
    return req.user;
  }

}
