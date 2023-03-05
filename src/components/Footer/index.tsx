import { Spacer } from '@nextui-org/react';
import React from 'react';

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
      <div>(c) 2023)</div>
    </>
  );
};

export default Footer;
