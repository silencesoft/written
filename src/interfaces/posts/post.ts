export interface Refs {
  pos: number;
  value: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  image: string;
  slug: string;
  tags: string[];
  summary: string;
  published_at: number;
  aRefs?: Refs[];
  eRefs?: Refs[];
  pRefs?: Refs[];
}
