import { Post } from '@/interfaces/posts/post';

export const createRss = async (posts: Post[]) => {
  const endpoint = `${process.env.NEXT_PUBLIC_URL}/api/rss`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(posts),
  };

  const response = await fetch(endpoint, options);

  const success = await response.json();

  return success.success;
};
