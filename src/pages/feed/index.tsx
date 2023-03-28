import fs from 'fs';
import { GetServerSideProps } from 'next';
import path from 'path';
import React from 'react';

type Props = {};

const Feed: React.FC = (props: Props) => {
  return <>Miss feed file.</>;
};

export default Feed;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const directory = process.env.NEXT_PUBLIC_RSS_PUBLIC === 'true' ? path.resolve(process.cwd(), 'public') : '/tmp';
  const file = `${directory}/rss.xml`;

  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file);

    /**  Set Cache Control in vercel @see https://vercel.com/docs/edge-network/caching#stale-while-revalidate */
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');

    res.setHeader('Content-Type', 'text/xml');
    res.write(content);

    res.end();
  }

  // Empty since we don't render anything
  return {
    props: {},
  };
};
