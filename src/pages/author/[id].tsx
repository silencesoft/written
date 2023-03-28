import { Container, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

import Author from '@/components/Author';
import { Filter } from '@/interfaces/nostr/filter';
import Home from '..';

type Props = {};

const Tag: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <></>;
  }

  const filter: Filter = { type: 'author', value: id?.toString() };

  return (
    <>
      {id && (
        <Container>
          <Author id={id.toString()} />
          <Spacer y={2} />
          <Home embedded={true} filter={filter} />
        </Container>
      )}
    </>
  );
};

export default Tag;
