import axios from 'axios';
import { RANDOM_NUMBER, NOME, PRODUCT } from './utils.js';

const invoker = async () => {
  //Gerando número aleatório para simular um processo de geração de pedidos
  const quantity = RANDOM_NUMBER()
  const client = NOME[quantity];
  const product = PRODUCT[quantity];
  const order = { client, product, quantity };
  try {
    await axios.post('http://localhost:3000/order', order);
    console.log('Pedido enviado:', order);
  } catch (error) {
    console.error('Erro ao enviar pedido:', error);
  }
}

setInterval(invoker, 5000);

