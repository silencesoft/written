import { Card, Col, Text } from '@nextui-org/react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import React from 'react';

import { postsAtom } from '@/state/nostr';

type Props = {};

const Title: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { slug } = router.query;
  const posts = useAtomValue(postsAtom);
  const post = posts.filter((post) => post.slug === slug || post.id === slug);

  return (
    <Card>
      <Card.Header css={{ position: 'absolute', zIndex: 1, bottom: 5 }}>
        <Col>
          <Text h2 size={28} css={{ textAlign: 'center' }} color="white">
            {post?.[0]?.title || ''}
          </Text>
        </Col>
      </Card.Header>
      <Card.Image
        src="https://nextui.org/images/card-example-4.jpeg"
        objectFit="cover"
        width="100%"
        height={340}
        alt="Card image background"
      />
    </Card>
  );
};

export default Title;
