import { renderString } from '@/utils/renderString';
import { Avatar, Button, Card, Col, Container, Link, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useProfile } from 'nostr-react';
import { nip05 } from 'nostr-tools';
import React, { useEffect, useState } from 'react';
import { RiShieldCheckLine, RiSpam2Line } from 'react-icons/ri';
import { RxLightningBolt, RxPerson } from 'react-icons/rx';
import Linkify from 'react-linkify';

type Props = {};

const Header: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: userData } = useProfile({
    pubkey: id?.toString() || '',
  });
  const [valid, setValid] = useState(false);

  const openWallet = () => {
    router.push(`lightning:${userData?.lud16}`);
  };

  useEffect(() => {
    const checkNip = async () => {
      if (userData?.nip05) {
        const valid = await nip05.queryProfile(userData?.nip05);
        setValid(valid?.pubkey === id);
      }
    };

    checkNip();
  }, [userData?.nip05, id]);

  return (
    <Container css={{ padding: 0, margin: 0 }}>
      <Card>
        <Card.Image
          src={
            userData?.banner
              ? userData?.banner
              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII= '
          }
          objectFit="cover"
          width="100%"
          height={340}
          alt="Card image background"
        />
      </Card>
      <Row css={{ d: 'flex', gap: 20, justifyContent: 'space-between' }}>
        <Col css={{ d: 'flex', gap: 20 }}>
          {userData?.picture ? (
            <Avatar src={userData?.picture} css={{ size: 120, marginTop: -40 }} />
          ) : (
            <Avatar icon={<RxPerson />} css={{ size: 120, marginTop: -40 }} />
          )}
          <div style={{ marginTop: 10 }}>
            <Text size={20}>{userData?.display_name}</Text>
            <Text>@{userData?.name}</Text>
            {userData?.nip05 && (
              <Text>
                {valid ? <RiShieldCheckLine /> : <RiSpam2Line />} {userData?.nip05}
              </Text>
            )}
          </div>
        </Col>
        <Col css={{ d: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
          {userData?.lud16 && (
            <Button light auto icon={<RxLightningBolt />} css={{ color: '#94f9f0' }} onClick={openWallet} />
          )}
        </Col>
      </Row>
      <Container>
        {userData?.about && (
          <Text>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <Link target="blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </Link>
              )}
            >
              {renderString(userData?.about)}
            </Linkify>
          </Text>
        )}
        {userData?.website && (
          <Text>
            <Link href={userData?.website} target="_blank">
              {userData?.website}
            </Link>
          </Text>
        )}
      </Container>
    </Container>
  );
};

export default Header;
