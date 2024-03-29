import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { dateToUnix, useNostrEvents } from 'nostr-react';
import { useEffect, useRef } from 'react';

import { defaultFilter } from '@/constants/defaultValues';
import { Filter } from '@/interfaces/nostr/filter';
import { Post } from '@/interfaces/posts/post';
import { authorsAtom, filterAtom, postsAtom, tagsAtom } from '@/state/nostr';

type Props = {
  filter?: Filter;
};

export const useGetPosts = ({ filter = defaultFilter }: Props) => {
  const [posts, setPosts] = useAtom(postsAtom);
  const setTags = useSetAtom(tagsAtom);
  const setFilter = useSetAtom(filterAtom);
  const authors: string[] = useAtomValue(authorsAtom);
  const now = useRef(new Date());
  const event: any = {
    filter: {
      authors,
      until: dateToUnix(now.current),
      kinds: [30023],
      limit: 10,
    },
  };
  setFilter(filter);

  if (filter?.type) {
    let type = '';
    switch (filter.type) {
      case 'tag':
        type = '#t';
        event.filter[type] = [filter.value];
        break;
      case 'author':
        type = 'authors';
        event.filter[type] = [filter.value];
        break;
      case 'post':
        type = 'ids';
        event.filter[type] = [filter.value];
        break;
      case 'slug':
        type = '#d';
        event.filter[type] = [filter.value];
        break;
      default:
        break;
    }
  }

  const { events, isLoading } = useNostrEvents(event);
  const eventsString = JSON.stringify(events);

  useEffect(() => {
    const data: Post[] = [];
    let list: string[] = [];

    events.forEach((event) => {
      const title = event.tags.filter((tag) => tag[0] === 'title');
      const image = event.tags.filter((tag) => tag[0] === 'image');
      const publishedAt = event.tags.filter((tag) => tag[0] === 'published_at');
      const slug = event.tags.filter((tag) => tag[0] === 'd');
      const tags = event.tags.filter((tag) => tag[0] === 't');
      const aRefs = event.tags.filter((tag) => tag[0] === 'a');
      const eRefs = event.tags.filter((tag) => tag[0] === 'e');
      const pRefs = event.tags.filter((tag) => tag[0] === 'p');
      const summary = event.tags.filter((tag) => tag[0] === 'summary');
      list = [...list, ...tags.map((tag) => tag[1].toLowerCase())];

      data.push({
        id: event.id,
        title: title[0][1],
        content: event.content,
        image: image.length ? image[0][1] : '',
        author: event.pubkey,
        slug: slug.length ? slug[0][1] : event.id,
        published_at: publishedAt.length ? parseInt(publishedAt[0][1]) : 0,
        tags: tags.map((tag) => tag[1].toLowerCase()),
        summary: summary.length ? summary[0][1] : '',
        aRefs: aRefs.map((aRef) => {
          return { pos: parseInt(aRef[2]), value: aRef[1].toLowerCase() };
        }),
        eRefs: eRefs.map((eRef) => {
          return { pos: parseInt(eRef[2]), value: eRef[1].toLowerCase() };
        }),
        pRefs: pRefs.map((pRef) => {
          return { pos: parseInt(pRef[2]), value: pRef[1].toLowerCase() };
        }),
      });
    });

    setTags(list.filter((item, index) => list.indexOf(item) === index));

    if (!isLoading) {
      setPosts(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsString, filter.value, isLoading]);

  return { posts, isLoading };
};
