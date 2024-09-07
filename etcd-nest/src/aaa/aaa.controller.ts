import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { Etcd3 } from 'etcd3';
import { EtcdService } from 'src/etcd/etcd.service';

@Controller('aaa')
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Inject(EtcdService)
  private etcdService: EtcdService;

  @Get('getConfig')
  async getConfig() {
    return await this.etcdService.getConfig();
  }

  @Get('setConfig')
  async setConfig(@Query('value') value: string) {
    await this.etcdService.setConfig(value);
    return 'done';
  }

  @Get('deleteConfig')
  async deleteConfig() {
    await this.etcdService.deleteConfig();
    return 'done';
  }
}
