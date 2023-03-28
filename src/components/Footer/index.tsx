import { Container, Link, Spacer } from '@nextui-org/react';
import React from 'react';
import { MdRssFeed } from 'react-icons/md';

type Props = {};

const Footer: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Spacer y={2} />
      <hr
        style={{
          height: '2px',
        }}
      />
      <Spacer y={1} />
      <Container css={{ d: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>(c) 2023</div>

        {process.env.NEXT_PUBLIC_RSS === 'true' && (
          <Link href="/rss.xml" target={'_blank'}>
            <MdRssFeed color="#ee802f" size="30px" />
          </Link>
        )}
      </Container>
      <Spacer y={1} />
    </>
  );
};

export default Footer;
