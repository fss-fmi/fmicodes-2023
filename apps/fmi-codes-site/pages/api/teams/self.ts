import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { getUserBySession } from '../users/self';
import prisma from '../../../lib/prismadb';

const handler = nextConnect(onError);

// GET /api/teams/self
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }
  const team = await getTeamBySession(session);
  res.status(200).json(team);
});

export async function getTeamBySession(session: Session) {
  const user = await getUserBySession(session);

  if (!user || !user.teamId) {
    return null;
  }

  return await prisma.team.findUnique({
    where: {
      id: user.teamId,
    },
  });
}

export default handler;
