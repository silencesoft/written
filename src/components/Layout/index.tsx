import React from 'react';
import Footer from '../Footer';

import Header from '../Header';
import WithSidebar from './WithSIdebar';

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Header />
      <WithSidebar>{children}</WithSidebar>
      <Footer />
    </>
  );
};

export default Layout;
