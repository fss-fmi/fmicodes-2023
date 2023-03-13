import nextConnect from 'next-connect';
import { onError } from '../../../../lib/api-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { getUserBySession } from '../../users/self';
import { getTeamById } from '../[id]';
import prisma from '../../../../lib/prismadb';

const handler = nextConnect(onError);

interface KickDto {
  userId: string;
}

// POST /api/teams/self/kick
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }

  const kickDto: KickDto = req.body;

  await kickFromTeam(session, kickDto.userId);
  res.status(200);
});

export async function kickFromTeam(session: Session, userId: string) {
  // Get captain user from session
  const captainUser = await getUserBySession(session);

  if (!captainUser || !captainUser.teamId) {
    throw Error('Не сте част от отбор!');
  }

  // Get capitan team
  const teamId = captainUser.teamId;
  const team = await getTeamById(teamId);

  if (!team) {
    throw Error('Не сте част от отбор!');
  }

  // Check if user is team captain
  if (captainUser.teamCaptain !== team) {
    throw Error('Не сте капитан на отбора!');
  }

  // Get user to kick
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw Error('Потребителят не съществува!');
  }

  // Check if user is in team
  if (user.teamId !== teamId) {
    throw Error('Потребителят не е част от отбора!');
  }

  // Remove user from team
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      teamId: null,
    },
  });
}

export default handler;
