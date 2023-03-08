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
}
