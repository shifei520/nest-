import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  @Inject(UserService)
  private userService: UserService;

  async validateUser(username: string, password: string) {
    const user = this.userService.findOne(username);

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.password !== password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    const { password: _, ...result } = user;

    return result;
  }
}
