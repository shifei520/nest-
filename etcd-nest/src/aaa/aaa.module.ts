import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { EtcdModule } from 'src/etcd/etcd.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    EtcdModule.forRootAsync({
      async useFactory(configService: ConfigService) {
        await 111;

        return {
          hosts: configService.get('etcd_hosts'),
          auth: {
            username: configService.get('etcd_username'),
            password: configService.get('etcd_password'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
