import { useRouter } from 'next/router';
import React from 'react';

import { Filter } from '@/interfaces/nostr/filter';
import Home from '..';

type Props = {
  tag: string;
};

const Tag: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { tag } = router.query;

  if (!tag) {
    return <></>;
  }

  const filter: Filter = { type: 'tag', value: tag?.toString() };

  return (
    <>
      <Home embedded={true} filter={filter} />
    </>
  );
};

export default Tag;
