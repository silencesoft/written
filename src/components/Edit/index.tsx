import { Container, Loading } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';

import Form from './Form';

type Props = {};

const EditForm: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container>
      <h2>{id === '0' ? 'Create' : 'Edit'} Post</h2>
      <Suspense fallback={<Loading />}>
        <Form />
      </Suspense>
    </Container>
  );
};

export default EditForm;
