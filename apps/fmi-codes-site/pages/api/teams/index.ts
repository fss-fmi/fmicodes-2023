import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await handleGET(res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/teams
async function handleGET(res) {
  const teams = await getTeams();
  res.json(teams);
}

export async function getTeams() {
  return await prisma.team.findMany({
    include: {
      members: true,
      teamProjectTechnologies: { include: { technology: true } },
    },
  });
}
