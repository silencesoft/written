import { Container } from '@nextui-org/react';
import React from 'react';
import Footer from '../Footer';

import Header from '../Header';
import WithSidebar from './WithSidebar';

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <Container css={{ maxWidth: 1440, margin: '0 auto', padding: 0 }}>
      <Header />
      <WithSidebar>{children}</WithSidebar>
      <Footer />
    </Container>
  );
};

export default Layout;
