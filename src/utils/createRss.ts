import { Feed } from 'feed';
import fs from 'fs';
import path from 'path';

import { Post } from '@/interfaces/posts/post';

type Props = {
  posts: Post[];
};

export const createRss = ({ posts }: Props) => {
  const siteUrl = process.env.NEXT_PUBLIC_URL || '';
  const directory = process.env.NEXT_PUBLIC_RSS_PUBLIC === 'true' ? path.resolve(process.cwd(), 'public') : '/tmp';
  const file = `${directory}/rss.xml`;

  const options = {
    title: `${process.env.NEXT_PUBLIC_NAME} posts | RSS Feed`,
    description: 'Welcome to this blog posts!',
    id: siteUrl,
    link: siteUrl,
    image: '', // `${siteUrl}/logo.png`,
    favicon: '', //  `${siteUrl}/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()} ${process.env.NEXT_PUBLIC_NAME}`,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
  };

  const feed = new Feed(options);

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/post/${post.slug}`,
      link: `${siteUrl}/post/${post.slug}`,
      description: post.summary,
      date: new Date(post.published_at),
    });
  });

  fs.writeFileSync(file, feed.rss2());
};
