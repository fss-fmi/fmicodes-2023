import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';

const handler = nextConnect(onError);

// GET /api/teams
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const teams = await getTeams();
  res.json(teams);
});

export async function getTeams() {
  return await prisma.team.findMany({
    include: {
      members: true,
      teamProjectTechnologies: { include: { technology: true } },
    },
  });
}

export default handler;
