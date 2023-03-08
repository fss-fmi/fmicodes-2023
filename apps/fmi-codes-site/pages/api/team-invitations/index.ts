import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { getUserBySession } from '../users/self';
import prisma from '../../../lib/prismadb';
import { UserWithoutPasswordWithJoins } from '../../../lib/types';

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

  const invitations = getTeamInvitations(user.id);
  res.status(200).json(invitations);
});

export async function getTeamInvitations(userId: string) {
  return await prisma.teamInvitation.findMany({
    where: {
      userId: userId,
    },
    include: {
      team: true,
    },
  });
}

// POST /api/team-invitations
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send('Unauthorized');
    return;
  }

  const inviter = await getUserBySession(session);
  if (!inviter) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    const { inviteeId } = req.body;
    const invitations = await createTeamInvitation(inviter, inviteeId);
    res.status(200).json(invitations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export async function createTeamInvitation(
  inviter: UserWithoutPasswordWithJoins,
  inviteeId: string
) {
  if (inviter.id === inviteeId) {
    // throw new Error('Нямате право да поканите сам себе си.');
  }

  if (!inviter.teamCaptain) {
    throw new Error('Само капитаните могат да поканят играчи.');
  }

  const invitee = await prisma.user.findUnique({
    where: {
      id: inviteeId,
    },
  });

  if (!invitee) {
    throw new Error('Няма такъв играч.');
  }

  const team = inviter.teamCaptain;

  return await prisma.teamInvitation.create({
    data: {
      teamId: team.id,
      userId: invitee.id,
    },
    include: {
      team: true,
    },
  });
}

export default handler;
