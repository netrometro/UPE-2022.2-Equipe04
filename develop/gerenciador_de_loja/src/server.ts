import Fastify from 'fastify';
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap(){
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    fastify.get('/produtos/count', async () => {
        const count = await prisma.produtos.count()

        return(count)
    })
    fastify.post('/produtos', async (request, reply) => {
        const { tipo } = request.body

        
        return { tipo }
    })
    await fastify.listen({port: 3333, host: 'localhost'})
}
bootstrap()