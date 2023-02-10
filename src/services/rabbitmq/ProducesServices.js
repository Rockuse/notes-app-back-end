const amqp = require('amqplib');

class ProducerService {
  // eslint-disable-next-line class-methods-use-this
  async sendMessage(queue, message) {
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, {
      durable: true,
    });

    await channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
    }, 1000);
  }
}

module.exports = ProducerService;
