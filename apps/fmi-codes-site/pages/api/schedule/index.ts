import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';

const handler = nextConnect(onError);

// GET /api/technologies
handler.get(
  async (
    req: NextApiRequest & { [key: string]: string },
    res: NextApiResponse
  ) => {
    const technologies = await getSchedule();
    res.status(200).json(technologies);
  }
);

export async function getSchedule() {
  return await prisma.schedule.findMany({
    orderBy: { startsAt: 'asc' },
  });
}

export default handler;
