import { Card, Col, Text } from '@nextui-org/react';
import React from 'react';

type Props = {
  title: string;
  image?: string;
};

const Title: React.FC<Props> = ({ title, image }: Props) => {
  return (
    <Card>
      <Card.Footer isBlurred css={{ position: 'absolute', zIndex: 1, bottom: 0, bgBlur: '#0f111466' }}>
        <Col>
          <Text h2 size={28} css={{ textAlign: 'center' }} color="white">
            {title}
          </Text>
        </Col>
      </Card.Footer>
      <Card.Image
        src={
          image
            ? image
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII= '
        }
        objectFit="cover"
        width="100%"
        height={340}
        alt="Card image background"
      />
    </Card>
  );
};

export default Title;
