import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { UserService } from './user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        TypeOrmModule.forRoot(config),
        TaskModule,
        AuthModule,
        PassportModule,
        JwtModule
    ],
    controllers: [AppController],
    providers: [AppService, AuthService, LocalStrategy, UserService, JwtService],
})
export class AppModule { }
