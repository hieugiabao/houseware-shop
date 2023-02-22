export interface PaginateResultResponse<T> {
  data: T[];
  currentPage: number;
  from: number;
  to: number;
  lastPage: number;
  perPage: number;
  total: number;
}
