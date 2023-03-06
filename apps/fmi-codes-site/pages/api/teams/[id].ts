import prisma from '../../../lib/prismadb';
import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect(onError);

// GET /api/teams/[id]
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const teamId = req.query.id as string;
  const team = await getTeamByIdString(teamId);
  res.status(200).json(team);
});

export async function getTeamById(teamId: number) {
  return await prisma.team.findUnique({
    where: {
      id: teamId,
    },
    include: {
      members: true,
      teamProjectTechnologies: { include: { technology: true } },
    },
  });
}

export async function getTeamByIdString(teamId: string) {
  return await getTeamById(parseInt(teamId));
}

export default handler;
