import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session } from 'next-auth';

import { authOptions } from '../auth/[...nextauth]';
import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';
import prisma from '../../../lib/prismadb';

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
  const dbUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!dbUser) {
    return null;
  }

  const { passwordHash, ...user } = dbUser;

  return user;
}

export async function getUserBySession(session: Session | null | undefined) {
  if (!session || !session.user || !session.user.email) {
    return null;
  }
  return await getUserByEmail(session.user.email);
}

export default handler;
