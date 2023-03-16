import Fastify, { fastify } from 'fastify'
import routes from './controllers/ProdutosController';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify/types/instance';
import fastifyCors from '@fastify/cors';
import { usersRoutes } from './routes/user';

const prisma = new PrismaClient({
  log: ['query'],
});

await prisma.$connect();

const fastify: FastifyInstance = Fastify({
  logger: true
});

fastify.register(fastifyCors, {
  origin: '*',
});

await routes(fastify, prisma);
await fastify.register(usersRoutes)


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
