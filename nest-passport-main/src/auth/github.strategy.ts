import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: '',
      clientSecret: '',
      callbackURL: 'http://localhost:3000/callback',
      scope: ['public_profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any) {
    return profile;
  }
}
