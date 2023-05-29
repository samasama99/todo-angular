import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'local' }),
        JwtModule.register({
            secret: `${process.env.JWT_KEY}`, // ENV
            signOptions: {
                expiresIn: '60s'
            }
        })
    ],
    providers: [UserService, AuthService, JwtService, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule { }
