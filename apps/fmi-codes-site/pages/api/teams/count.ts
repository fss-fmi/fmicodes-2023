import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';

const handler = nextConnect(onError);

// GET /api/teams/count
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const count = await getTeamsCount();
  res.status(200).json(count);
});

export async function getTeamsCount() {
  return await prisma.team.count();
}

export default handler;
