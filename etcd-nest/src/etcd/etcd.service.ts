import { Inject, Injectable } from '@nestjs/common';
import { Etcd3 } from 'etcd3';

@Injectable()
export class EtcdService {
  @Inject('ETCD_CLIENT')
  private etcdClient: Etcd3;

  async getConfig() {
    return await this.etcdClient.get('foo').string();
  }

  async setConfig(value: string) {
    await this.etcdClient.put('foo').value(value);
  }

  async deleteConfig() {
    await this.etcdClient.delete().key('foo');
  }

  // 服务注册
  async registerService(serviceName, instanceId, metadata) {
    const key = `/services/${serviceName}/${instanceId}`;
    const lease = this.etcdClient.lease(10);
    await lease.put(key).value(JSON.stringify(metadata));
    lease.on('lost', async () => {
      console.log('租约过期，重新注册...');
      await this.registerService(serviceName, instanceId, metadata);
    });
  }

  // 服务发现
  async discoverService(serviceName) {
    const instances = await this.etcdClient
      .getAll()
      .prefix(`/services/${serviceName}`)
      .strings();
    return Object.entries(instances).map(([key, value]) => JSON.parse(value));
  }

  // 监听服务变更
  async watchService(serviceName, callback) {
    const watcher = await this.etcdClient
      .watch()
      .prefix(`/services/${serviceName}`)
      .create();
    watcher
      .on('put', async (event) => {
        console.log('新的服务节点添加:', event.key.toString());
        callback(await this.discoverService(serviceName));
      })
      .on('delete', async (event) => {
        console.log('服务节点删除:', event.key.toString());
        callback(await this.discoverService(serviceName));
      });
  }
}
