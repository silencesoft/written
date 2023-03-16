import { Link } from '@nextui-org/react';
import React from 'react';
import Linkify from 'react-linkify';

type Props = {
  children: JSX.Element;
};

const DoLink: React.FC<Props> = ({ children }: Props) => {
  return (
    <Linkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
        <Link target="blank" href={decoratedHref} key={key}>
          {decoratedText}
        </Link>
      )}
    >
      {children}
    </Linkify>
  );
};

export default DoLink;
