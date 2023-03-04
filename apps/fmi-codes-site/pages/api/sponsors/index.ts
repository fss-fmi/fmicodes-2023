import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';

const handler = nextConnect(onError);

// GET /api/sponsors
handler.get(
  async (
    req: NextApiRequest & { [key: string]: string },
    res: NextApiResponse
  ) => {
    const technologies = await getSponsors();
    res.status(200).json(technologies);
  }
);

export async function getSponsors() {
  return await prisma.sponsor.findMany();
}

export default handler;
