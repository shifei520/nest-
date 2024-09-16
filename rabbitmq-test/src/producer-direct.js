import * as amqp from 'amqplib'

const connect = await amqp.connect('amqp://localhost:5672')
const channel = await connect.createChannel()

await channel.assertExchange('direct-test-exchange', 'direct')

channel.publish('direct-test-exchange', 'aaa', Buffer.from('hello aaa'))
channel.publish('direct-test-exchange', 'bbb', Buffer.from('hello bbb'))
channel.publish('direct-test-exchange', 'ccc', Buffer.from('hello ccc'))