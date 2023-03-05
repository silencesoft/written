import { Grid } from '@nextui-org/react';
import Item from './Item';

type Props = {};

const Blog = (props: Props) => {
  return (
    <Grid.Container gap={2}>
      <Grid xs={12} sm={6}>
        <Item />
      </Grid>

      <Grid xs={12} sm={6}>
        <Item />
      </Grid>

      <Grid xs={12} sm={6}>
        <Item />
      </Grid>

      <Grid xs={12} sm={6}>
        <Item />
      </Grid>

      <Grid xs={12} sm={6}>
        <Item />
      </Grid>
    </Grid.Container>
  );
};

export default Blog;
