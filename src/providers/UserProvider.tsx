import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = { children: JSX.Element; session: Session };

const UserProvider: React.FC<Props> = ({ session, children }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default UserProvider;
