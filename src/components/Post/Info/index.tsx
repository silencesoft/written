import { Avatar, Button, Col, Container, Row, Text } from '@nextui-org/react';
import { RxLightningBolt } from 'react-icons/rx';

type Props = {};

const Info = (props: Props) => {
  return (
    <Container css={{ padding: 0, margin: 0 }}>
      <Row>
        <Col span={9} css={{ padding: 0, margin: 0 }}>
          <Container css={{ d: 'flex', gap: 10, padding: 0, margin: 0 }}>
            <div>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="lg" />
            </div>
            <div>
              <Text color="#d1d1d1" size={12}>
                Author name
              </Text>
              <Text color="#d1d1d1" size={10}>
                10-10-2022
              </Text>
            </div>
          </Container>
        </Col>
        <Col span={3} css={{ padding: 0, margin: 0 }}>
          <Row justify="flex-end">
            <Button light auto icon={<RxLightningBolt />} css={{ color: '#94f9f0' }} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Info;
