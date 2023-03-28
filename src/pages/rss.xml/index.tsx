import fs from 'fs';
import { GetServerSideProps } from 'next';
import React from 'react';

type Props = {};

const Rss: React.FC = (props: Props) => {
  return <>Missed feed file.</>;
};

export default Rss;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const file = `/tmp/rss.xml`;

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
