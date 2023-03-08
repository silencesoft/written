export type FilterType = 'tag' | 'author' | 'post';

export interface Filter {
  type: FilterType;
  value: string;
}
