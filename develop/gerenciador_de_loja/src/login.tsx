import { FastifyInstance } from 'fastify';
import bcrypt from 'fastify-bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { prisma } from 'lib/prisma';

interface ILoginBody{
  email: string;
  password: string;
}


export function login(app: FastifyInstance) {
  const JWT_SECRET = process.env.JWT_SECRET;
  
  app.post<{Body: ILoginBody}>('/login', async (request, reply) => {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !await app.bcrypt.compare(password, user.password)) {
      reply.status(401).send({ error: 'Email ou senha inválidos' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET as Secret);

    reply.send({ user, token });
  });
}
