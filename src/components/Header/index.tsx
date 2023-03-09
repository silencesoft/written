import { Button, Loading, Navbar, Spacer } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';

import LoggedIn from './LoggedIn';
import SiteName from './SiteName';
import ToggleTheme from './ToggleTheme';

type Props = {};

const Header: React.FC<Props> = (props: Props) => {
  const siteName = process.env.NEXT_PUBLIC_NAME;
  const { data: session } = useSession();
  const router = useRouter();

  const goLogin = () => {
    router.push('/login');
  };

  return (
    <>
      <Navbar shouldHideOnScroll isBordered={true} variant="sticky">
        <Navbar.Brand>
          <SiteName name={siteName || ''} />
        </Navbar.Brand>
        <Navbar.Content></Navbar.Content>
        <Navbar.Content>
          <ToggleTheme />
          <Suspense fallback={<Loading />}>
            {!session?.user && (
              <Button auto onClick={goLogin}>
                Login
              </Button>
            )}
            {session?.user && (
              <>
                <LoggedIn />
              </>
            )}
          </Suspense>
        </Navbar.Content>
      </Navbar>
      <Spacer y={2} />
    </>
  );
};

export default Header;
