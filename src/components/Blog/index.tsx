import { useGetPosts } from '@/hooks/useGetPosts';
import { Grid, Loading } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import React, { Suspense } from 'react';

import { postsAtom } from '@/state/nostr';
import Item from './Item';

type Props = {};

const Blog: React.FC<Props> = (props: Props) => {
  const posts = useAtomValue(postsAtom);

  useGetPosts({});

  return (
    <Grid.Container gap={2}>
      {!!posts.length &&
        posts.map((post) => (
          <Grid xs={12} sm={6} key={post.id}>
            <Suspense fallback={<Loading />}>
              <Item post={post} />
            </Suspense>
          </Grid>
        ))}
    </Grid.Container>
  );
};

export default Blog;
