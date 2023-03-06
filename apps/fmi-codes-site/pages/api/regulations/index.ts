import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';

const handler = nextConnect(onError);

// GET /api/regulations
handler.get(
  async (
    req: NextApiRequest & { [key: string]: string },
    res: NextApiResponse
  ) => {
    const technologies = await getRegulations();
    res.status(200).json(technologies);
  }
);

export async function getRegulations() {
  return await prisma.regulation.findMany();
}

export default handler;
