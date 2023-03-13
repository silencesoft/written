import { atom } from 'jotai';

import { Filter } from '@/interfaces/nostr/filter';
import { Post } from '@/interfaces/posts/post';
import { getAuthors } from '@/services/getAuthors';

export const relaysAtom = atom<string[]>(() => {
  const relay: string = process.env.NEXT_PUBLIC_RELAY || '';
  const relays: string[] = relay.split(',');

  if (relays.length) {
    return relays;
  } else {
    return [];
  }
});

export const postsAtom = atom<Post[]>([]);

// <Author[]>
export const authorsAtom = atom(async (get) => {
  // const authors: string[] = [];

  // authors.push(process.env.NEXT_PUBLIC_ADMIN || '');

  const authors = await getAuthors();

  return authors;
});

export const profilesAtom = atom({});

export const tagsAtom = atom<string[]>([]);

export const filterAtom = atom<Filter>({} as Filter);
