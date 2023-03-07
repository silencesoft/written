import { Grid } from '@nextui-org/react';
import React from 'react';

import Sidebar from '@/components/Sidebar';

type Props = {
  children: JSX.Element;
};

const WithSidebar: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Grid.Container gap={2}>
        <Grid xs={12} md={9}>
          {children}
        </Grid>
        <Grid xs={12} md={3}>
          <Sidebar />
        </Grid>{' '}
      </Grid.Container>
    </>
  );
};

export default WithSidebar;
