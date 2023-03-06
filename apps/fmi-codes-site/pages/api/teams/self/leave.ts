import nextConnect from 'next-connect';
import { onError } from '../../../../lib/api-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { getUserBySession } from '../../users/self';
import prisma from '../../../../lib/prismadb';
import { getTeamById } from '../[id]';

const handler = nextConnect(onError);

// POST /api/teams/self/leave
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }
  await leaveTeam(session);
  res.status(200);
});

export async function leaveTeam(session: Session) {
  const user = await getUserBySession(session);

  if (!user || !user.teamId) {
    throw Error('Не сте част от отбор!');
  }

  // Get user team
  const teamId = user.teamId;
  const team = await getTeamById(teamId);

  if (!team) {
    throw Error('Не сте част от отбор!');
  }

  // Check if user is team captain
  if (user.teamCaptain !== null && team.members.length > 1) {
    throw Error('Не можете да напуснете отбора, докато сте капитан!');
  }

  // Remove user from team
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      teamId: null,
    },
  });

  // Delete team if there is no one left
  if (team && team.members.length === 0) {
    await prisma.team.delete({
      where: {
        id: teamId,
      },
    });
  }
}

export default handler;
