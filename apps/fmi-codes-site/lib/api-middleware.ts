import { NextApiRequest, NextApiResponse } from 'next';

export const onError = {
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    console.error(error);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
};
