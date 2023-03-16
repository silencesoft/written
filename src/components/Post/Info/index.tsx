import { Avatar, Button, Col, Container, Link, Row, Text } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useProfile } from 'nostr-react';
import { RxCalendar, RxClock, RxLightningBolt, RxPerson } from 'react-icons/rx';
import { TiEdit } from 'react-icons/ti';
import readingTime from 'reading-time';

type Props = {
  id: string;
  author: string;
  date: number;
  content: string;
};

const Info = ({ id, author, date, content }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: userData } = useProfile({
    pubkey: author,
  });
  const stats = readingTime(content);

  const openWallet = () => {
    router.push(`lightning:${userData?.lud16}`);
  };

  const goEdit = () => {
    router.push(`/edit/${id}`);
  };

  return (
    <Container css={{ padding: 0, margin: 0 }}>
      <Row>
        <Col span={9} css={{ padding: 0, margin: 0 }}>
          <Container css={{ d: 'flex', gap: 10, padding: 0, margin: 0 }}>
            <Link href={`/author/${author}`} style={{ display: 'block', width: '100%' }}>
              {userData?.picture ? (
                <Avatar src={userData?.picture} size="lg" />
              ) : (
                <Avatar icon={<RxPerson />} size="lg" />
              )}
            </Link>
            <Link href={`/author/${author}`} style={{ display: 'block', width: '100%' }}>
              <Text color="#d1d1d1" size={12}>
                {userData?.display_name} &nbsp;
              </Text>
              <Text color="#d1d1d1" size={10}>
                @{userData?.name} &nbsp;
              </Text>
            </Link>
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
            {session?.user?.name === author && (
              <Button light auto icon={<TiEdit />} css={{ color: '#94f9f0' }} onClick={goEdit} />
            )}
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
