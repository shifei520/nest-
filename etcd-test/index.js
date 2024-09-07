const { Etcd3 } = require('etcd3');
const client = new Etcd3({
  hosts: 'http://localhost:2379',
  auth: {
    username: 'root',
    password: '123456'
  }
});

// async function saveConfig(key, value) {
//   await client.put(key).value(value);
// }

// async function getConfig(key) {
//   return await client.get(key).string();
// }

// async function deleteConfig(key) {
//   await client.delete().key(key);
// }

// (async function main() {
//   await saveConfig('port', 3000);
//   const configValue = await getConfig('port');
//   console.log('Config value:', configValue);
// })();

async function registerService(name, instance, metadata) {
  const key = `/services/${name}/${instance}`;
  const value = JSON.stringify(metadata);
  const lease = client.lease(10);
  await lease.put(key).value(value);
  lease.on('lost', async () => {
    console.log('租约过期， 重新注册。。。。。。');
    await registerService(name, instance, metadata)
  })
}

async function getServiceInstances(name) {
  const key = `/services/${name}`;
  const result = await client.getAll().prefix(key).strings();
  return Object.entries(result).map(([key, value]) => JSON.parse(value));
}

async function watchServiceChanges(name, callback) {
  const key = `/services/${name}`;
  const watcher = await client.watch().prefix(key).create();
  watcher.on('put', async (event) => {
    console.log('新的服务节点添加', event.key.toString());
    callback(await getServiceInstances(name))
  });
  watcher.on('delete', async (event) => {
    console.log('新的服务节点删除', event.key.toString());
    callback(await getServiceInstances(name))
  });
}

(async function(){
  const serviceName = 'blog_service';
  await registerService(serviceName, 'instance_1', { host: 'localhost', port: 3000 });
  await registerService(serviceName, 'instance_2', { host: 'localhost', port: 3001 });
  await registerService(serviceName, 'instance_3', { host: 'localhost', port: 3002 });

  console.log(await getServiceInstances(serviceName));

  watchServiceChanges(serviceName, (instances) => {
    console.log('服务实例列表', instances);
  })
})()