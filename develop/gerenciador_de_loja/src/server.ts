import Fastify, { fastify } from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import { z } from 'zod'
import bcrypt from 'fastify-bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    fastify.get('/', async () => {
        const count = await prisma.user.count()
        return {count}
    })

    fastify.post('/fornecedor', async (request, reply) => {
        const createSupplierBody = z.object({
            name: z.string(),
        })

        const { name } = request.body;

        return { name }


        await prisma.supplier.create({
            data: {
                name,
            }
        })

    fastify.get('/fornecedor/count', async () => {
        const count = await prisma.supplier.count()
        return {count}
    })

    await fastify.listen({port: 3333})
    })
}