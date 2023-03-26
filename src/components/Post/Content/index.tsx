import { Container } from '@nextui-org/react';
import { nip19 } from 'nostr-tools';
import React, { useEffect, useState } from 'react';
import { useRemark } from 'react-remark';

import DoLink from '@/components/General/DoLink';
import { useUpdateContent } from '@/hooks/useUpdateContent';
import { Refs } from '@/interfaces/posts/post';

type Props = {
  content: string;
  aRefs?: Refs[];
  eRefs?: Refs[];
  pRefs?: Refs[];
};

const Content: React.FC<Props> = ({ content, pRefs, eRefs, aRefs }: Props) => {
  const [reactContent, setMarkdownSource] = useRemark();
  pRefs?.forEach((pRef) => {
    const search = `#[${pRef.pos}]`;

    content = content.replace(search, `[${pRef.value}](nostr:${nip19.npubEncode(pRef.value)})`);
  });
  eRefs?.forEach((eRef) => {
    const search = `#[${eRef.pos}]`;

    content = content.replace(search, `[${eRef.value}]`);
  });
  aRefs?.forEach((aRef) => {
    const custom = aRef.value.split(':');
    const search = `#[${aRef.pos}]`;

    content = content.replace(search, `[${custom[2]}]`);
  });
  const [output, setOutput] = useState(content);

  useUpdateContent({ output, setOutput, aRefs, pRefs, eRefs });

  useEffect(() => {
    setMarkdownSource(output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output]);

  return <Container css={{ overflowWrap: 'break-word' }}>{reactContent && <DoLink>{reactContent}</DoLink>}</Container>;
};

export default Content;
