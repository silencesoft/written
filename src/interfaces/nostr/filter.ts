export type FilterType = 'tag' | 'author';

export interface Filter {
  type: FilterType;
  value: string;
}
