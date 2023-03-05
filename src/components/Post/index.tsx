import { Container, Spacer } from '@nextui-org/react';
import React from 'react';
import Content from './Content';

import Info from './Info';
import Title from './Title';

type Props = {};

const Post: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <Title />
      <Spacer y={1} />
      <Info />
      <Spacer y={2} />
      <Content />
    </Container>
  );
};

export default Post;
