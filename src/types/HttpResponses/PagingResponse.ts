export type PagingResponse<T> = {
  totalPage: number;
  currentPage: number;
  values: T[];
  totalCount?: number;
  totalTake?: number;
};
