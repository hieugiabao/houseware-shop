import { ApiErrorDto } from '@shop/shared/data-access/models';
import { catchError, MonoTypeOperatorFunction, throwError } from 'rxjs';

export function logErrorAndRethrow<TInput = unknown>(
  cb?: (error?: ApiErrorDto) => void
): MonoTypeOperatorFunction<TInput> {
  return catchError((err: ApiErrorDto) => {
    console.error(err);
    cb?.(err);
    return throwError(() => err);
  });
}
