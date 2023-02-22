import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler = nextConnect(onError);

// GET /api/users/self
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }
  const user = await getUserBySession(session);
  res.status(200).json(user);
});

export async function getUserByEmail(email: string) {
  const { passwordHash, ...user } = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
}

export async function getUserBySession(session: Session) {
  return await getUserByEmail(session.user.email);
}

export default handler;
