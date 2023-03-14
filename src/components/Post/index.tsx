import { Container, Loading, Spacer } from '@nextui-org/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect } from 'react';
import Content from './Content';

import { useGetPosts } from '@/hooks/useGetPosts';
import { filterAtom, postsAtom } from '@/state/nostr';
import Info from './Info';
import Title from './Title';

type Props = {};

const Post: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { slug } = router.query;
  const posts = useAtomValue(postsAtom);
  // const post = posts.filter((post) => post.slug === slug || post.id === slug);

  const setFilter = useSetAtom(filterAtom);

  useEffect(() => {
    if (slug) {
      if (slug.toString().match(/[0-9A-Fa-f]{6}/g) && slug.toString().length > 20) {
        setFilter({ type: 'post', value: slug?.toString() });
      } else {
        setFilter({ type: 'slug', value: slug?.toString() });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useGetPosts({});

  if (!posts.length) {
    return <></>;
  }

  const { id, title, content, image, published_at, author, aRefs, pRefs } = posts?.[0];

  return (
    <Container>
      <Title title={title} image={image} />
      <Spacer y={1} />
      <Suspense fallback={<Loading />}>
        <Info author={author} date={published_at} content={content} id={id} />
      </Suspense>
      <Spacer y={2} />
      <Content content={content} aRefs={aRefs} pRefs={pRefs} />
    </Container>
  );
};

export default Post;
