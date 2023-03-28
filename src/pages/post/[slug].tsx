import { useRouter } from 'next/router';
import React from 'react';

import Post from '@/components/Post';

type Props = {};

const Detail: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return <></>;
  }

  return (
    <>
      <Post slug={slug?.toString() || ''} />
    </>
  );
};

export default Detail;
