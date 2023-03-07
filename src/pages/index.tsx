import { useAtom } from 'jotai';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useEffect } from 'react';

import Blog from '@/components/Blog';
import { Filter } from '@/interfaces/nostr/filter';
import { filterAtom } from '@/state/nostr';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  embedded: boolean;
};

export default function Home({ embedded = false }: Props) {
  const [filter, setFilter] = useAtom(filterAtom);

  useEffect(() => {
    if (!embedded && filter?.type) {
      setFilter({} as Filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Written</title>
        <meta name="description" content="Written" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ flex: 1 }}>
        <Blog />
      </main>
    </>
  );
}
