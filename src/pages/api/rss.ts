import type { NextApiRequest, NextApiResponse } from 'next';

import { HttpStatusCode } from '@/constants/apiResponses';
import { Post } from '@/interfaces/posts/post';
import { createRss } from '@/utils/createRss';

type Data = {
  success: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const posts = req.body as Post[];

    createRss({ posts });

    return res.status(HttpStatusCode.OK).json({
      success: true,
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).end(`${req.method} Not Allowed`);
  }
}
