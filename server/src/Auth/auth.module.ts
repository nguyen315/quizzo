import { AuthService } from './auth.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserModule } from 'src/User/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local.auth.guard';

@Module({
    imports: [UserModule, PassportModule],
    controllers: [],
    providers: [
        AuthService, LocalStrategy, LocalAuthGuard],
})
export class AuthModule {}
