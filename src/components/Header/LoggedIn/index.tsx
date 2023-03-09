import { Avatar, Dropdown, Navbar, Text } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { useProfile } from 'nostr-react';
import React from 'react';
import { RxPerson } from 'react-icons/rx';

type Props = {};

type Action = 'profile' | 'logout';

const LoggedIn: React.FC<Props> = (props: Props) => {
  const { data: session } = useSession();
  const { data: userData } = useProfile({
    pubkey: session?.user?.name || '',
  });

  const doAction = (action: Action): void => {
    if (action === 'logout') {
      signOut();
    }
  };

  return (
    <div>
      <Dropdown placement="bottom-right">
        <Navbar.Item>
          <Dropdown.Trigger>
            {userData?.picture ? (
              <Avatar bordered as="button" src={userData?.picture} size="md" />
            ) : (
              <Avatar bordered as="button" icon={<RxPerson />} size="md" />
            )}
          </Dropdown.Trigger>
        </Navbar.Item>
        <Dropdown.Menu
          aria-label="User menu actions"
          color="secondary"
          onAction={(actionKey) => doAction(actionKey as Action)}
        >
          <Dropdown.Item key="profile" css={{ height: '$18' }}>
            {/* <Text b color="inherit" css={{ d: 'flex' }}>
                  Signed in as
                </Text> */}
            <Text b color="inherit" css={{ d: 'flex' }}>
              @{userData?.name}
            </Text>
          </Dropdown.Item>
          <Dropdown.Item key="logout" withDivider color="error">
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default LoggedIn;
