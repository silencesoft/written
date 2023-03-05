import { Card, Col, Text } from '@nextui-org/react';

type Props = {};

const Title = (props: Props) => {
  return (
    <Card>
      <Card.Header css={{ position: 'absolute', zIndex: 1, bottom: 5 }}>
        <Col>
          <Text h2 size={28} css={{ textAlign: 'center' }} color="white">
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
    </Card>
  );
};

export default Title;
