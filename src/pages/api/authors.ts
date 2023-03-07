// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  authors: string[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const authors: string[] = [];

  authors.push(process.env.NEXT_PUBLIC_ADMIN || '');

  Object.keys(process.env).forEach((element) => {
    if (element.startsWith('NEXT_PUBLIC_AUTHOR') && !!process.env[element]) {
      authors.push(process.env[element] || '');
    }
  });

  res.status(200).json({ authors });
}
