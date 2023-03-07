import { Loading, Text } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import React, { Suspense } from 'react';

import { authorsAtom } from '@/state/nostr';
import Author from './Author';

type Props = {};

const Authors: React.FC<Props> = (props: Props) => {
  const authors: string[] = useAtomValue(authorsAtom);

  if (!authors.length) {
    return <></>;
  }

  return (
    <div>
      <Text h4>Authors</Text>
      {authors.map((author) => (
        <Suspense key={author} fallback={<Loading />}>
          <Author key={author} author={author} />
        </Suspense>
      ))}
    </div>
  );
};

export default Authors;
