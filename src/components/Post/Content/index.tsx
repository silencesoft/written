import { Container } from '@nextui-org/react';
import { Metadata, useNostrEvents } from 'nostr-react';
import React, { useEffect, useState } from 'react';
import { useRemark } from 'react-remark';

import DoLink from '@/components/General/DoLink';
import { Refs } from '@/interfaces/posts/post';

type Props = {
  content: string;
  aRefs?: Refs[];
  pRefs?: Refs[];
};

const Content: React.FC<Props> = ({ content, pRefs }: Props) => {
  const [reactContent, setMarkdownSource] = useRemark();
  pRefs?.forEach((pRef) => {
    const search = `#[${pRef.pos}]`;

    content = content.replace(search, `[${pRef.value}](nostr:${pRef.value})`);
  });
  const [output, setOutput] = useState(content);
  const authorsList = pRefs?.map((pRef) => pRef.value);

  const { events: authors } = useNostrEvents({
    filter: {
      authors: authorsList,
      kinds: [0],
    },
  });

  useEffect(() => {
    const updateValue = () => {
      let replaced = output;

      if (authorsList?.length && authors.length > authorsList?.length - 10) {
        authors.forEach((author) => {
          const value: Refs[] = pRefs?.filter((pRef) => pRef.value === author.pubkey) || ([] as Refs[]);
          const userData: Metadata = JSON.parse(author.content);

          if (value?.length) {
            const search = `[${value[0].value}](nostr`;

            if (userData?.name) {
              replaced = replaced.replace(search, `[@${userData.name}](nostr`);
            }
          }
        });
      }

      setOutput(replaced);
    };

    updateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authors.length]);

  useEffect(() => {
    setMarkdownSource(output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output]);

  return (
    <Container>
      <DoLink>{reactContent}</DoLink>
    </Container>
  );
};

export default Content;
