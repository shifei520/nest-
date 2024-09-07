import { DynamicModule, Module } from '@nestjs/common';
import { EtcdService } from './etcd.service';
import { Etcd3, IOptions } from 'etcd3';

const ETCD_OPTIONS = 'ETCD_OPTIONS';
const ETCD_CLIENT = 'ETCD_CLIENT';

export interface EtcdModuleAsyncOptions {
  useFactory?: (...args: any[]) => Promise<IOptions> | IOptions;
  inject?: any[];
}

@Module({})
export class EtcdModule {
  static forRoot(options: IOptions): DynamicModule {
    return {
      module: EtcdModule,
      providers: [
        EtcdService,
        {
          provide: ETCD_CLIENT,
          useFactory: (options: IOptions) => {
            const client = new Etcd3(options);
            return client;
          },
          inject: [ETCD_OPTIONS],
        },
        {
          provide: ETCD_OPTIONS,
          useValue: options,
        },
      ],
      exports: [EtcdService],
    };
  }

  static forRootAsync(options: EtcdModuleAsyncOptions): DynamicModule {
    return {
      module: EtcdModule,
      providers: [
        EtcdService,
        {
          provide: ETCD_CLIENT,
          useFactory: (options: IOptions) => {
            const client = new Etcd3(options);
            return client;
          },
          inject: [ETCD_OPTIONS],
        },
        {
          provide: ETCD_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [EtcdService],
    };
  }
}
