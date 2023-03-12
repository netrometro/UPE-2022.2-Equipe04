import Fastify, { fastify } from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
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

    await fastify.listen({port: 3333})
}

const app = fastify();

app.post('/login', async (request, reply) => {
  const { email, password } = request.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    reply.status(401).send({ error: 'Email ou senha inválidos' });
    return;
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  reply.send({ user, token });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

bootstrap()