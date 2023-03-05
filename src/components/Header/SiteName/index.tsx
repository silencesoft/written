import { Text } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
};

const SiteName: React.FC<Props> = ({ name }: Props) => {
  return (
    <Link href="/">
      <Text h1 css={{ fontSize: 24 }}>
        {name}
      </Text>
    </Link>
  );
};

export default SiteName;
