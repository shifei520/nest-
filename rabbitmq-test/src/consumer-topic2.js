import * as amqp from 'amqplib'

const connect = await amqp.connect('amqp://localhost:5672')
const channel = await connect.createChannel()

await channel.assertExchange('topic-test-exchange', 'topic')

const { queue } = await channel.assertQueue('topic2')
await channel.bindQueue(queue, 'topic-test-exchange', 'bbb.*')

channel.consume(queue, (msg) => {
  console.log(msg.content.toString());
}, { noAck: true })