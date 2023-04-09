import Fastify from 'fastify'
import productsRoutes from './controllers/ProductsController';
import { FastifyInstance } from 'fastify/types/instance';
import fastifyCors from '@fastify/cors';
import { usersRoutes } from './controllers/UserController';

export const fastify: FastifyInstance = Fastify({
  logger: true
});

fastify.register(fastifyCors, {
  origin: '*',
});

fastify.register(productsRoutes);
fastify.register(usersRoutes)


/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3333 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start() 
