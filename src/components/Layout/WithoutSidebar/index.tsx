import { Grid } from '@nextui-org/react';
import React from 'react';

type Props = {
  children: JSX.Element;
};

const WithoutSidebar: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Grid.Container gap={2}>
        <Grid xs={12}>{children}</Grid>
      </Grid.Container>
    </>
  );
};

export default WithoutSidebar;
