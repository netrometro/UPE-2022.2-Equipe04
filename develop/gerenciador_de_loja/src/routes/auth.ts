import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../lib/prisma';

interface LoginRequest {
    email: string;
    password: string;
  }

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/signup', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password, name } = request.body as { email: string, password: string, name?: string };

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      reply.status(400).send({ error: 'Usuário já existe' });
      return;
    }

    const newUser = await prisma.user.create({
        data: {
          email: email,
          password: password,
          name: name!,
        },
      });

    reply.send({ message: 'Usuário criado', user: newUser });
  });

  fastify.post('/auth', async (request, reply) => {
    const { email, password } = request.body as LoginRequest;

    // Procura um usuário com base no email fornecido
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      // Se o usuário não for encontrado, envia uma resposta com status 404
      reply.status(404).send({ error: 'Usuário não encontrado' });
      return;
    }

    // Verifica se a senha fornecida corresponde à senha do usuário
    if (user.password !== password) {
      // Se a senha estiver incorreta, envia uma resposta com status 400
      reply.status(400).send({ error: 'Senha inválida' });
      return;
    }

    // Se o email e a senha estiverem corretos, envia uma resposta com status 200
    reply.status(201).send({ message: 'Usuário logado' });
  });

}