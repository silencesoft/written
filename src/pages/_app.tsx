import { Container } from '@nextui-org/react';
import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';
import MainProvider from '@/providers/MainProvider';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <MainProvider session={session}>
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    </MainProvider>
  );
}
