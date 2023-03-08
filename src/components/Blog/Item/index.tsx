import { Avatar, Button, Card, Col, Row, Text } from '@nextui-org/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useProfile } from 'nostr-react';
import React from 'react';
import { RxLightningBolt, RxPerson } from 'react-icons/rx';

import { Post } from '@/interfaces/posts/post';

type Props = {
  post: Post;
};

const Item: React.FC<Props> = ({ post }: Props) => {
  const router = useRouter();
  const { title, author, published_at, slug, tags, image } = post;
  const { data: userData } = useProfile({
    pubkey: author,
  });

  const openWallet = () => {
    router.push(`lightning:${userData?.lud16}`);
  };

  return (
    <Link href={`/post/${slug}`} style={{ display: 'block', width: '100%' }}>
      <Card isPressable>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5, textShadow: 'black 2px 2px' }}>
          <Col>
            <Text size={12} weight="bold" transform="uppercase">
              {tags[0]}
            </Text>
            <Text h2 b size={20} color="white">
              {title}
            </Text>
          </Col>
        </Card.Header>
        <Card.Image
          src={
            image
              ? image
              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII= '
          }
          objectFit="cover"
          width="100%"
          height={340}
          alt=""
          title={title}
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
                  {userData?.picture ? (
                    <Avatar src={userData?.picture} size="lg" />
                  ) : (
                    <Avatar icon={<RxPerson />} size="lg" />
                  )}
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
                {userData?.lud16 && (
                  <Button light auto icon={<RxLightningBolt />} css={{ color: '#94f9f0' }} onClick={openWallet} />
                )}
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default Item;
