import { useRouter } from 'next/router';
import React, { Suspense } from 'react';

import Header from './Header';

type Props = {
  id: string;
};

const Author: React.FC<Props> = ({id}: Props) => {
  return <Suspense>{id && <Header />}</Suspense>;
};

export default Author;
