import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { filterAtom } from '@/state/nostr';
import Home from '..';

type Props = {};

const Tag: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { tag } = router.query;
  const setFilter = useSetAtom(filterAtom);

  useEffect(() => {
    if (tag) {
      setFilter({ type: 'tag', value: tag?.toString() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  return (
    <>
      <Home embedded={true} />
    </>
  );
};

export default Tag;
