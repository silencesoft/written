import { useGetPosts } from '@/hooks/useGetPosts';
import { Grid, Loading } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import React, { Suspense } from 'react';

import { Filter } from '@/interfaces/nostr/filter';
import { createRss } from '@/services/createRss';
import { postsAtom } from '@/state/nostr';
import Item from './Item';

type Props = {
  filter: Filter;
};

const Blog: React.FC<Props> = ({ filter }: Props) => {
  const posts = useAtomValue(postsAtom);

  const savePosts = async () => {
    await createRss(posts);
  };

  if (process.env.NEXT_PUBLIC_RSS === 'true' && posts.length) {
    savePosts();
  }

  const { isLoading } = useGetPosts({ filter });

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

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
