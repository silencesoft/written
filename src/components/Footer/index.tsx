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
        <div>{process.env.NEXT_PUBLIC_FOOTER_COPYRIGHT}</div>

        {process.env.NEXT_PUBLIC_RSS === 'true' && (
          <Link href="/feed" target={'_blank'}>
            <MdRssFeed color="#ee802f" size="30px" />
          </Link>
        )}
      </Container>
      <Spacer y={1} />
    </>
  );
};

export default Footer;
