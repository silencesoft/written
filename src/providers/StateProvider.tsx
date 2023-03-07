import { Provider as JotaiProvider } from 'jotai';
import React from 'react';

type Props = {
  children: JSX.Element;
};

const StateProvider: React.FC<Props> = ({ children }: Props) => {
  return <JotaiProvider>{children}</JotaiProvider>;
};

export default StateProvider;
