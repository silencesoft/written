import React from 'react';
import UIProvider from './UIProvider';

type Props = {
  children: JSX.Element;
};

const MainProvider: React.FC<Props> = ({ children }: Props) => {
  return <UIProvider>{children}</UIProvider>;
};

export default MainProvider;
