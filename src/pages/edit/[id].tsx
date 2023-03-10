import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';

import EditForm from '@/components/Edit';

type Props = {};

const Edit: React.FC<Props> = (props: Props) => {
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
