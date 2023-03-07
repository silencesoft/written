import { Avatar, Button, Card, Col, Row, Text } from '@nextui-org/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useProfile } from 'nostr-react';
import React from 'react';
import { RxLightningBolt } from 'react-icons/rx';

import { Post } from '@/interfaces/posts/post';

type Props = {
  post: Post;
};

const Item: React.FC<Props> = ({ post }: Props) => {
  const { title, author, published_at, slug, tags } = post;
  const { data: userData } = useProfile({
    pubkey: author,
  });

  return (
    <Link href={`/post/${slug}`} style={{ display: 'block', width: '100%' }}>
      <Card isPressable>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col>
            <Text size={12} weight="bold" transform="uppercase">
              {tags[0]}
            </Text>
            <Text h2 size={20} color="white">
              {title}
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
        <Card.Footer
          isBlurred
          css={{
            position: 'absolute',
            bgBlur: '#0f111466',
            borderTop: '$borderWeights$light solid $gray800',
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col span={9}>
              <Row>
                <Col span={4}>
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="lg" />
                </Col>
                <Col>
                  <Text color="#d1d1d1" size={12}>
                    @{userData?.name}&nbsp;
                  </Text>
                  <Text color="#d1d1d1" size={10}>
                    {dayjs.unix(published_at).format('MMM D, YYYY')}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={3}>
              <Row justify="flex-end">
                <Button light auto icon={<RxLightningBolt />} css={{ color: '#94f9f0' }} />
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default Item;
