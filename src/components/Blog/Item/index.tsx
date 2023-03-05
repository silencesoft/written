import { Avatar, Button, Card, Col, Row, Text } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { RxLightningBolt } from 'react-icons/rx';

type Props = {};

const Item: React.FC<Props> = (props: Props) => {
  return (
    <Link href="/post-detail" style={{ display: 'block', width: '100%' }}>
      <Card isPressable>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col>
            <Text size={12} weight="bold" transform="uppercase">
              What to watch
            </Text>
            <Text h2 size={20} color="white">
              Stream the Acme event
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
                    Author name
                  </Text>
                  <Text color="#d1d1d1" size={10}>
                    10-10-2022
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
