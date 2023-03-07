import { Avatar, Container, Link, Text } from '@nextui-org/react';
import { useProfile } from 'nostr-react';
import React from 'react';
import { RxPerson } from 'react-icons/rx';

type Props = {
  author: string;
};

const Author: React.FC<Props> = ({ author }: Props) => {
  const { data: userData } = useProfile({
    pubkey: author,
  });

  return (
    <Link href={`/author/${author}`} style={{ display: 'block', width: '100%' }}>
    <Container alignItems="center" wrap="nowrap" css={{ d: 'flex', padding: 0, margin: '0 0 20px', gap: 10 }}>
      {userData?.picture ? <Avatar src={userData?.picture} size="lg" /> : <Avatar icon={<RxPerson />} size="lg" />}
      <div>
        <Text>{userData?.display_name}&nbsp;</Text>
        <Text size={12}>@{userData?.name}&nbsp;</Text>
      </div>
    </Container>
    </Link>
  );
};

export default Author;
