export type FilterType = 'tag' | 'author' | 'post' | 'slug' | '';

export interface Filter {
  type: FilterType;
  value: string;
}
