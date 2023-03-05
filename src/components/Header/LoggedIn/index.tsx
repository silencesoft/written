import { Avatar, Button, Dropdown, Navbar, Text } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import React from 'react';

import { userAtom } from '@/state/user';
import { useResetAtom } from 'jotai/utils';

type Props = {};

type Action = 'profile' | 'logout';

const LoggedIn: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const resetUser = useResetAtom(userAtom);

  const goLogin = () => {
    router.push('/login');
  };

  const doAction = (action: Action): void => {
    if (action === 'logout') {
      resetUser();
    }
  };

  return (
    <div>
      {!user?.pk && (
        <Button auto onClick={goLogin}>
          Login
        </Button>
      )}
      {user?.pk && (
        <>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => doAction(actionKey as Action)}
            >
              <Dropdown.Item key="profile" css={{ height: '$18' }}>
                <Text b color="inherit" css={{ d: 'flex' }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: 'flex' }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
    </div>
  );
};

export default LoggedIn;
