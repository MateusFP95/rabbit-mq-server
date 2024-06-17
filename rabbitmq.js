import amqp from 'amqplib';

const processOrders = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('orders');

  channel.consume('orders', (msg) => {
    if (msg !== null) {
      const order = JSON.parse(msg.content.toString());
      console.log('Pedido recebido: ', order);

      // Timeout pra criar a fila de processamento
      setTimeout(() => {
        console.log('Pedido processado', order);
        channel.ack(msg);
      }, 10000);
    }
  });
};

processOrders();
