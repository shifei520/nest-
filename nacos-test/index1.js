import { NacosNamingClient } from 'nacos';
const logger = console;

const client = new NacosNamingClient({
  logger,
  serverList: '127.0.0.1:8848', // replace to real nacos serverList
  namespace: 'public',
});
await client.ready();

const serviceName = 'nodejs.test.domain';

// registry instance
await client.registerInstance(serviceName, {
  ip: '1.1.1.1',
  port: 8080,
});
await client.registerInstance(serviceName, {
  ip: '2.2.2.2',
  port: 8080,
});

// subscribe instance
client.subscribe(serviceName, hosts => {
  console.log(hosts);
});

// setTimeout(async () => {
//   // deregister instance
//   await client.deregisterInstance(serviceName, {
//     ip: '1.1.1.1',
//     port: 8080,
//   });
// }, 1000);