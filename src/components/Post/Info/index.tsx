import { Avatar, Button, Col, Container, Row, Text } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useProfile } from 'nostr-react';
import { RxCalendar, RxClock, RxLightningBolt, RxPerson } from 'react-icons/rx';
import readingTime from 'reading-time';

type Props = {
  author: string;
  date: number;
  content: string;
};

const Info = ({ author, date, content }: Props) => {
  const router = useRouter();
  const { data: userData } = useProfile({
    pubkey: author,
  });
  const stats = readingTime(content);

  const openWallet = () => {
    router.push(`lightning:${userData?.lud16}`);
  };

  return (
    <Container css={{ padding: 0, margin: 0 }}>
      <Row>
        <Col span={9} css={{ padding: 0, margin: 0 }}>
          <Container css={{ d: 'flex', gap: 10, padding: 0, margin: 0 }}>
            <div>
              {userData?.picture ? (
                <Avatar src={userData?.picture} size="lg" />
              ) : (
                <Avatar icon={<RxPerson />} size="lg" />
              )}
            </div>
            <div>
              <Text color="#d1d1d1" size={12}>
                {userData?.display_name} &nbsp;
              </Text>
              <Text color="#d1d1d1" size={10}>
                @{userData?.name} &nbsp;
              </Text>
            </div>
            <div>
              <Container css={{ d: 'flex' }}>
                <RxCalendar /> &nbsp;
                <Text color="#d1d1d1" size={12}>
                  {dayjs.unix(date).format('MMM D, YYYY')}
                </Text>
              </Container>
              <Container css={{ d: 'flex' }}>
                <RxClock /> &nbsp;
                <Text color="#d1d1d1" size={10}>
                  {stats.text}
                </Text>
              </Container>
            </div>
          </Container>
        </Col>
        <Col span={3} css={{ padding: 0, margin: 0 }}>
          <Row justify="flex-end">
            {userData?.lud16 && (
              <Button light auto icon={<RxLightningBolt />} css={{ color: '#94f9f0' }} onClick={openWallet} />
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Info;
