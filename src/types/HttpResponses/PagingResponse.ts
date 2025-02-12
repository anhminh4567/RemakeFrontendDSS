export type PagingResponse<T> = {
  totalPage: number;
  currentPage: number;
  Values: T[];
  totalCount?: number;
  totalTake?: number;
};
