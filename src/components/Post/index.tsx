import { Container, Loading, Spacer } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import React, { Suspense } from 'react';
import Content from './Content';

import { useGetPosts } from '@/hooks/useGetPosts';
import { Filter } from '@/interfaces/nostr/filter';
import { postsAtom } from '@/state/nostr';
import Info from './Info';
import Title from './Title';

type Props = { slug: string };

const Post: React.FC<Props> = ({ slug }: Props) => {
  const posts = useAtomValue(postsAtom);

  let filter: Filter = {} as Filter;

  if (slug) {
    if (slug.toString().match(/[0-9A-Fa-f]{6}/g) && slug.toString().length > 20) {
      filter = { type: 'post', value: slug?.toString() };
    } else {
      filter = { type: 'slug', value: slug?.toString() };
    }
  }

  const { isLoading } = useGetPosts({ filter });

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (!posts.length || posts?.[0].slug !== slug) {
    return <></>;
  }

  const { id, title, content, image, published_at, author, aRefs, eRefs, pRefs } = posts?.[0];

  return (
    <Container>
      <Title title={title} image={image} />
      <Spacer y={1} />
      <Suspense fallback={<Loading />}>
        <Info author={author} date={published_at} content={content} id={id} />
      </Suspense>
      <Spacer y={2} />
      <Content content={content} aRefs={aRefs} eRefs={eRefs} pRefs={pRefs} />
    </Container>
  );
};

export default Post;
