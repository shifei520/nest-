import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { IsAuth } from './is-auth/is-auth.decorator';

declare module 'express' {
  interface Request {
    user: {
      id: number;
      username: string;
      role: string;
    };
  }
}

@Controller()
export class AppController {
  @Inject(JwtService)
  private jwtService: JwtService;
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    const user = req.user;
    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
    return { token };
  }

  @IsAuth()
  @Get()
  getHello(@Req() req: Request): string {
    console.log('req.user', req.user);

    return this.appService.getHello();
  }

  @Get('loginGithub')
  @UseGuards(AuthGuard('github'))
  async loginGithub() {
    return 'loginGithub';
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async callback(@Req() req: Request, @Res() res: Response) {
    if (req.user) {
      const token = this.jwtService.sign({
        id: req.user.id,
        username: req.user.username,
      });
      res.cookie('token', token);
      return res.redirect('/');
    }
    return res.send('/login');
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    return 'google';
  }

  @Get('callback/google')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    return req.user;

    // if (req.user) {
    //   const token = this.jwtService.sign({
    //     id: req.user.id,
    //     username: req.user.username,
    //   });
    //   res.cookie('token', token);
    //   return res.redirect('/');
    // }
    // return res.send('/login');
  }
}
