import { Inter } from 'next/font/google';
import Head from 'next/head';

import Blog from '@/components/Blog';
import { defaultFilter } from '@/constants/defaultValues';
import { Filter } from '@/interfaces/nostr/filter';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  embedded: boolean;
  filter?: Filter;
};

export default function Home({ filter = defaultFilter, embedded = false }: Props) {
  return (
    <>
      <Head>
        <title>Written</title>
        <meta name="description" content="Written" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ flex: 1 }}>
        <Blog filter={filter} />
      </main>
    </>
  );
}
