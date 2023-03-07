import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { getUserBySession } from '../users/self';
import prisma from '../../../lib/prismadb';

const handler = nextConnect(onError);

// GET /api/team-invitations
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }

  const user = await getUserBySession(session);
  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }

  const invitations = getInvitations(user.id);
  res.status(200).json(invitations);
});

export async function getInvitations(userId: string) {
  return await prisma.teamInvitation.findMany({
    where: {
      userId: userId,
    },
    include: {
      team: true,
    },
  });
}
