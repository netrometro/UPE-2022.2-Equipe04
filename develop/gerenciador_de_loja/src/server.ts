import Fastify from 'fastify';
import cors from '@fastify/cors'
import z from 'zod';
import { PrismaClient } from '@prisma/client'

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

    fastify.get('/produtos', async () => {
        const produtos = await prisma.produtos.findMany()
        return (produtos)
    })

    fastify.post('/produtos/create', async (request, reply) => {
        const createProdutosBody = z.object({
            tipo: z.string(),
            tamanho: z.string(),
            cor: z.string(),
            material: z.string().optional(),
            marca: z.string(),
            quantidade: z.number(),
            preco: z.number(),
        })
        const {tipo, tamanho, cor, material, marca, quantidade, preco} = createProdutosBody.parse(request.body)
        await prisma.produtos.create({
            data: {
                tipo,
                tamanho,
                cor,
                material,
                marca,
                quantidade,
                preco,
            }
        })
        return reply.status(201).send({message: 'Produto criado com sucesso!'});
    })

    fastify.get('/', async () => {
        const count = await prisma.user.count()
        return {hello: 'world'}
    })

    await fastify.listen({port: 3333})
}

bootstrap()