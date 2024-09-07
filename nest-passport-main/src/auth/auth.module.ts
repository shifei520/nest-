import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local-strategy';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt-strategy';
import { GitHubStrategy } from './github.strategy';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [UserModule],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GitHubStrategy,
    GoogleStrategy,
  ],
})
export class AuthModule {}
