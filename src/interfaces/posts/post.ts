export interface Post {
  id: string;
  title: string;
  author: string;
  slug: string;
  tags: string[];
  summary: string;
  published_at: number;
}
