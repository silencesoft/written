import { useRouter } from 'next/router';
import React, { Suspense } from 'react';

import Header from './Header';

type Props = {};

const Author: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

  return <Suspense>{id && <Header />}</Suspense>;
};

export default Author;
