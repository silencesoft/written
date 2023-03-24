import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import EditForm from '@/components/Edit';

type Props = {};

const Edit: React.FC<Props> = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!session) return;

    const checkSession = async () => {
      if (session?.user?.image !== session?.user?.name) {
        setLoggedIn(true);
        return;
      }

      try {
        const pk = await window?.nostr?.getPublicKey();
        const isLoggedIn = pk !== null && pk.length > 0;

        if (!isLoggedIn) {
          router.push('/login');
        } else {
          setLoggedIn(true);
        }
      } catch (err) {
        router.push('/login');
      }
    };

    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (!loggedIn) {
    return <></>;
  }

  return <EditForm />;
};

export default Edit;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
};
