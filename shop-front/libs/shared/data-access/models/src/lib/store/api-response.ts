export enum ApiResponseStatus {
  Success = 'success',
  Failure = 'failure',
  Loading = 'loading',
  Pending = 'pending',
}

export interface ApiResponse<T> {
  data: T | null;
  status: ApiResponseStatus;
  error: string | null | unknown;
}
