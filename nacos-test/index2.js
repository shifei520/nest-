import { NacosConfigClient } from 'nacos';   // ts // js


// for direct mode
const configClient = new NacosConfigClient({
  serverAddr: '127.0.0.1:8848',
});

// get config once
const content = await configClient.getConfig('test', 'DEFAULT_GROUP');
console.log('getConfig = ',content);

// listen data changed
configClient.subscribe({
  dataId: 'test',
  group: 'DEFAULT_GROUP',
}, content => {
  console.log(content);
});

// publish config
const content2 = await configClient.publishSingle('test', 'DEFAULT_GROUP', '测试');
console.log('getConfig = ',content2);

// remove config
// await configClient.remove('test', 'DEFAULT_GROUP');