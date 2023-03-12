import Fastify from 'fastify';
import routes from './controllers/ProdutosController';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify/types/instance';

const prisma = new PrismaClient({
  log: ['query'],
});

await prisma.$connect();

const fastify: FastifyInstance = Fastify({
  logger: true
});

await routes(fastify, prisma);

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
});

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
