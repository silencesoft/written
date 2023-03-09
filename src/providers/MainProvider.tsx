import { Loading } from '@nextui-org/react';
import { Session } from 'next-auth';
import React, { Suspense } from 'react';

import NostrDataProvider from './NostrProvider';
import StateProvider from './StateProvider';
import UIProvider from './UIProvider';
import UserProvider from './UserProvider';

type Props = {
  children: JSX.Element;
  session: Session;
};

const MainProvider: React.FC<Props> = ({ session, children }: Props) => {
  return (
    <UIProvider>
      <StateProvider>
        <NostrDataProvider>
          <UserProvider session={session}>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </UserProvider>
        </NostrDataProvider>
      </StateProvider>
    </UIProvider>
  );
};

export default MainProvider;
