import express from 'express';
import amqp from 'amqplib';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.post('/order', async (req, res) => {
  const order = req.body;

  // Enviando pedido para a fila do RabbitMQ
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('orders');

  channel.sendToQueue('orders', Buffer.from(JSON.stringify(order)));
  
  res.status(200).send('Pedido recebido');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
