import fastify from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from './prisma';

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