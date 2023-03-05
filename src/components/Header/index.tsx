import { Button, Navbar, Spacer } from '@nextui-org/react';
import React from 'react';

import SiteName from './SiteName';
import ToggleTheme from './ToggleTheme';

type Props = {};

const Header: React.FC<Props> = (props: Props) => {
  const siteName = process.env.NEXT_PUBLIC_NAME;

  return (
    <>
      <Navbar shouldHideOnScroll isBordered={true} variant="sticky">
        <Navbar.Brand>
          <SiteName name={siteName || ''} />
        </Navbar.Brand>
        <Navbar.Content></Navbar.Content>
        <Navbar.Content>
          <ToggleTheme />
          <Button auto>Login</Button>
        </Navbar.Content>
      </Navbar>
      <Spacer y={2} />
    </>
  );
};

export default Header;
