import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { dateToUnix, useNostrEvents } from 'nostr-react';
import { useEffect, useRef } from 'react';

import { Post } from '@/interfaces/posts/post';
import { authorsAtom, filterAtom, postsAtom, tagsAtom } from '@/state/nostr';

type Props = {};

export const useGetPosts = (props: Props) => {
  const [posts, setPosts] = useAtom(postsAtom);
  const setTags = useSetAtom(tagsAtom);
  const filter = useAtomValue(filterAtom);
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
  if (filter.type) {
    let type = '';
    switch (filter.type) {
      case 'tag':
        type = '#t';
        event.filter[type] = [filter.value];
        break;
      case 'author':
        type = 'authors';
        event.filter[type] = [filter.value];
      default:
        break;
    }
  }
  const { events } = useNostrEvents(event);

  useEffect(() => {
    const data: Post[] = [];
    let list: string[] = [];

    events.forEach((event) => {
      const title = event.tags.filter((tag) => tag[0] === 'title');
      const publishedAt = event.tags.filter((tag) => tag[0] === 'published_at');
      const slug = event.tags.filter((tag) => tag[0] === 'slug');
      const tags = event.tags.filter((tag) => tag[0] === 't');
      const summary = event.tags.filter((tag) => tag[0] === 'summary');
      list = [...list, ...tags.map((tag) => tag[1].toLowerCase())];

      data.push({
        id: event.id,
        title: title[0][1],
        author: event.pubkey,
        slug: slug.length ? slug[0][1] : event.id,
        published_at: publishedAt.length ? parseInt(publishedAt[0][1]) : 0,
        tags: tags.map((tag) => tag[1].toLowerCase()),
        summary: summary.length ? summary[0][1] : '',
      });
    });

    setTags(list.filter((item, index) => list.indexOf(item) === index));
    setPosts(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events.length, filter.value]);

  return posts;
};
