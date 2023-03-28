import { Metadata, useNostrEvents } from 'nostr-react';
import { nip19 } from 'nostr-tools';
import { useEffect, useState } from 'react';

import { Refs } from '@/interfaces/posts/post';

type Props = {
  output: string;
  setOutput: (value: string) => void;
  aRefs?: Refs[];
  eRefs?: Refs[];
  pRefs?: Refs[];
};

export const useUpdateContent = ({ output, setOutput, aRefs, eRefs, pRefs }: Props) => {
  const [authorsList, setAuthorsList] = useState(pRefs?.map((pRef) => pRef.value) || []);
  const { events: authors } = useNostrEvents({
    filter: {
      authors: authorsList,
      kinds: [0],
    },
  });
  const [force, setForce] = useState(true);
  const eventsList: string[] = eRefs?.map((eRef) => eRef.value) || [];

  const { events: notes } = useNostrEvents({
    filter: {
      ids: eventsList,
      kinds: [1],
    },
  });
  const kindsList: number[] = [];
  const othersList: string[] =
    aRefs?.map((aRef) => {
      const custom = aRef.value.split(':');

      if (!kindsList.includes(parseInt(custom[0]))) {
        kindsList.push(parseInt(custom[0]));
      }

      return custom[2];
    }) || [];
  const { events: others } = useNostrEvents({
    filter: {
      kinds: kindsList,
      ...(othersList.length && { '#d': othersList }),
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
          let search = '';

          if (value?.length) {
            search = `[${value[0].value}](nostr`;
          } else {
            search = `[${author.pubkey}](nostr`;
          }

          if (userData?.name) {
            replaced = replaced.replaceAll(search, `[@${userData.name}](nostr`);

            const searchImage = `[${author.pubkey}.image]`;

            replaced = replaced.replaceAll(
              searchImage,
              `<img alt="@${userData.name}" src="${userData?.picture}" width="200" />`
            );
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
            let content = event.content;

            content = content.replaceAll('\n', '\n>>');

            replaced = replaced.replace(
              search,
              `>>[${event.pubkey}](nostr:${event.pubkey})\n>>\n>>${content}\n>>\n>>\n>>Note: [${nip19.noteEncode(
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
    const updateValue = () => {
      let replaced = output;

      if (othersList?.length && others.length > othersList?.length - 10) {
        others.forEach((event) => {
          const value: Refs[] =
            aRefs?.filter((aRef) => {
              const custom = aRef.value.split(':');
              const slug = event.tags.filter((tag) => tag[0] === 'd');

              return custom[2] === slug[0][1];
            }) || ([] as Refs[]);

          if (value?.length) {
            const custom = value[0].value.split(':');
            const search = `[${custom[2]}]`;
            const title = event.tags.filter((tag) => tag[0] === 'title');

            replaced = replaced.replace(
              search,
              `>>[${title.length ? title[0][1] : ''}](${process.env.NEXT_PUBLIC_URL}/post/${
                custom[2]
              })\n>>\n>>\n>>[${nip19.naddrEncode({
                identifier: custom[2],
                pubkey: custom[1],

                kind: parseInt(custom[0]),
              })}](nostr:${nip19.naddrEncode({
                identifier: custom[2],
                pubkey: custom[1],

                kind: parseInt(custom[0]),
              })})`
            );
          }
        });

        setOutput(replaced);
      }
    };

    updateValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [others.length]);
};
