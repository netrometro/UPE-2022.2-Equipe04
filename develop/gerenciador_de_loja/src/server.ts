import Fastify, { fastify } from 'fastify'
import cors from '@fastify/cors'
import { usersRoutes } from './routes/user';

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(usersRoutes)

    await fastify.register(cors, {
        origin: true,
    })

    await fastify.listen({port: 3333})
}