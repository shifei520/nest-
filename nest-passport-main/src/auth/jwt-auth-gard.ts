import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_AUTH } from 'src/is-auth/is-auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  @Inject(Reflector)
  private reflector: Reflector;

  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isAuth = this.reflector.getAllAndOverride(IS_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isAuth) {
      return true;
    }
    return super.canActivate(context);
  }
}
