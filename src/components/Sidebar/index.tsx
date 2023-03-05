import { Avatar, Button, Container, Text } from '@nextui-org/react';
import React from 'react';

type Props = {};

const Sidebar: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <Text h4>Authors</Text>
      <>
        <Container alignItems="center" wrap="nowrap" css={{ d: 'flex', padding: 0, margin: '0 0 20px', gap: 10 }}>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="lg" />
          <div>
            <Text>Author name</Text>
            <Text size={12}>Username</Text>
          </div>
        </Container>
        <Container alignItems="center" wrap="nowrap" css={{ d: 'flex', padding: 0, margin: '0 0 20px', gap: 10 }}>
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="lg" />
          <div>
            <Text>Author name</Text>
            <Text size={12}>Username</Text>
          </div>
        </Container>
      </>
      <Text h4>Tags</Text>
      <Container alignItems="center" justify="center" css={{ d: 'flex', gap: 5, padding: 0, margin: 0 }}>
        <Button auto>Tag 1</Button>
        <Button auto>Tag 10</Button>
        <Button auto>Tag 11</Button>
        <Button auto>Tag 1</Button>
        <Button auto>Tag 1</Button>
        <Button auto>Tag 1</Button>
        <Button auto>Tag 1</Button>
        <Button auto>Tag 12</Button>
        <Button auto>Tag 13</Button>
      </Container>
    </div>
  );
};

export default Sidebar;
