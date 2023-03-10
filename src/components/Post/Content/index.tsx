import { Container } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useRemark } from 'react-remark';

type Props = {
  content: string;
};

const Content: React.FC<Props> = ({ content }: Props) => {
  const [reactContent, setMarkdownSource] = useRemark();

  useEffect(() => {
    setMarkdownSource(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Container>{reactContent}</Container>;
};

export default Content;
