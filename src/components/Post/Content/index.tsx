import { Container } from '@nextui-org/react';
import { Metadata, useNostrEvents } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import React, { useEffect, useState } from 'react';
import { useRemark } from 'react-remark';

import DoLink from '@/components/General/DoLink';
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
  const [output, setOutput] = useState(content);
  const [authorsList, setAuthorsList] = useState(pRefs?.map((pRef) => pRef.value) || []);
  const { events: authors } = useNostrEvents({
    filter: {
      authors: authorsList,
      kinds: [0],
    },
  });
  const [force, setForce] = useState(true);
  const eventsList = eRefs?.map((eRef) => eRef.value);
  const { events: notes } = useNostrEvents({
    filter: {
      ids: eventsList,
      kinds: [1],
    },
  });

  useEffect(() => {
    if (!force) return;

    const updateValue = () => {
      let replaced = output;

      if (authorsList?.length && authors.length > authorsList?.length - 10) {
        authors.forEach((author) => {
          const value: Refs[] = pRefs?.filter((pRef) => pRef.value === author.pubkey) || ([] as Refs[]);
          const userData: Metadata = JSON.parse(author.content);

          if (value?.length) {
            const search = `[${value[0].value}](nostr`;

            if (userData?.name) {
              replaced = replaced.replaceAll(search, `[@${userData.name}](nostr`);

              const searchImage = `[${value[0].value}.image]`;

              replaced = replaced.replaceAll(
                searchImage,
                `<img alt="@${userData.name}" src="${userData?.picture}" width="200" />`
              );
            }
          }
        });

        setOutput(replaced);

        if (authors.length === authorsList?.length) {
          setForce(false);
        }
      }
    };

    updateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authors.length, force]);

  useEffect(() => {
    const updateValue = () => {
      let replaced = output;

      if (eventsList?.length && notes.length > eventsList?.length - 10) {
        notes.forEach((event) => {
          const value: Refs[] = eRefs?.filter((eRef) => eRef.value === event.id) || ([] as Refs[]);

          if (value?.length) {
            const search = `[${value[0].value}]`;
            replaced = replaced.replace(
              search,
              `>[${event.pubkey}](nostr:${event.pubkey})\n>\n>${event.content}\n>\n>\n>[${nip19.noteEncode(
                event.id
              )}](nostr:${nip19.noteEncode(event.id)})`
            );

            setAuthorsList([...authorsList, ...[event.pubkey]]);
            setForce(true);
          }
        });

        setOutput(replaced);
      }
    };

    updateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes.length]);

  useEffect(() => {
    setMarkdownSource(output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output]);

  return <Container>{reactContent && <DoLink>{reactContent}</DoLink>}</Container>;
};

export default Content;
