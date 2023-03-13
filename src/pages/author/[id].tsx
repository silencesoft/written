import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Author from '@/components/Author';
import { filterAtom } from '@/state/nostr';
import { Container, Spacer } from '@nextui-org/react';
import Home from '..';

type Props = {};

const Tag: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const setFilter = useSetAtom(filterAtom);

  useEffect(() => {
    if (id) {
      setFilter({ type: 'author', value: id?.toString() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {id && (
        <Container>
          <Author />
          <Spacer y={2} />
          <Home embedded={true} />
        </Container>
      )}
    </>
  );
};

export default Tag;
