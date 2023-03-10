import { Container, Loading } from '@nextui-org/react';
import React, { Suspense } from 'react';

import Form from './Form';

type Props = {};

const EditForm: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <h2>Create Post</h2>
      <Suspense fallback={<Loading />}>
        <Form />
      </Suspense>
    </Container>
  );
};

export default EditForm;
