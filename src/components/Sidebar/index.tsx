import { Loading } from '@nextui-org/react';
import React, { Suspense } from 'react';

import Authors from './Authors';
import Tags from './Tags';

type Props = {};

const Sidebar: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Authors />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Tags />
      </Suspense>
    </div>
  );
};

export default Sidebar;
