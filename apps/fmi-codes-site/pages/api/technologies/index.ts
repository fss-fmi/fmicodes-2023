import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prismadb';
import nextConnect from 'next-connect';
import { onError } from '../../../lib/api-middleware';

const handler = nextConnect(onError);

// GET /api/technologies
handler.get(
  async (
    req: NextApiRequest & { [key: string]: string },
    res: NextApiResponse
  ) => {
    const technologies = await getTechnologies();
    res.status(200).json(technologies);
  }
);

export async function getTechnologies() {
  return await prisma.technology.findMany();
}

export default handler;
