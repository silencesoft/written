import { Image } from '@nextui-org/react';
import React from 'react';

type Props = {
  name: string;
  image: string;
};

const SiteImage: React.FC<Props> = ({ image, name }: Props) => {
  return (
    <>
      <Image src={image} alt={name} height={40} />
    </>
  );
};

export default SiteImage;
