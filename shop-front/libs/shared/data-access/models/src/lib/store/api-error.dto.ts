export interface ApiErrorDto {
  message?: string;
  statusCode?: number;
  errors?: unknown;
  trace?: string;
  path?: string;
  timestamp?: string;

  [key: string]: unknown;
}
