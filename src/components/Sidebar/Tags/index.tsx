import { Button, Container, Text } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import React from 'react';

import { tagsAtom } from '@/state/nostr';

type Props = {};

const Tags: React.FC<Props> = (props: Props) => {
  const tags = useAtomValue(tagsAtom);
  const router = useRouter();

  if (!tags.length) {
    return <></>;
  }

  return (
    <>
      <Text h4>Tags</Text>
      <Container alignItems="center" justify="center" css={{ d: 'flex', gap: 5, padding: 0, margin: 0 }}>
        {tags.map((tag) => (
          <Button key={tag} auto onClick={() => router.push(`/tag/${tag}`)}>
            {tag}
          </Button>
        ))}
      </Container>
    </>
  );
};

export default Tags;
