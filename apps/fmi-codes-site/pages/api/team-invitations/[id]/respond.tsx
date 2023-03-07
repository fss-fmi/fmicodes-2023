import nextConnect from 'next-connect';
import { onError } from '../../../../lib/api-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';
import { getUserBySession } from '../../users/self';
import { UserWithoutPassword } from '../../../../lib/types';
import prisma from '../../../../lib/prismadb';

const handler = nextConnect(onError);

// POST /api/team-invitations/:id/respond
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
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

  const { accept } = req.body;
  const { id } = req.query;

  if (accept) {
    await acceptInvite(user, parseInt(id as string));
  } else {
    await declineInvite(user, parseInt(id as string));
  }

  res.status(200).json({ message: 'OK' });
});

async function acceptInvite(user: UserWithoutPassword, id: number) {
  const invite = await prisma.teamInvitation.findUnique({
    where: {
      id,
    },
  });

  if (!invite) {
    throw new Error('Поканата не е намерена.');
  }

  if (invite.userId !== user.id) {
    throw new Error('Поканата не е за вас.');
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      teamId: invite.teamId,
    },
  });

  await prisma.teamInvitation.delete({
    where: {
      id,
    },
  });
}

async function declineInvite(user: UserWithoutPassword, id: number) {
  await prisma.teamInvitation.delete({
    where: {
      id,
    },
  });
}

export default handler;
