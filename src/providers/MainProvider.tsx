import { Loading } from '@nextui-org/react';
import React, { Suspense } from 'react';

import NostrDataProvider from './NostrProvider';
import StateProvider from './StateProvider';
import UIProvider from './UIProvider';

type Props = {
  children: JSX.Element;
};

const MainProvider: React.FC<Props> = ({ children }: Props) => {
  return (
    <UIProvider>
      <StateProvider>
        <NostrDataProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NostrDataProvider>
      </StateProvider>
    </UIProvider>
  );
};

export default MainProvider;
