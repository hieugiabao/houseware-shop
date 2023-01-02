import { ApiErrorDto } from '@shop/shared/data-access/models';
import { catchError, MonoTypeOperatorFunction, Observable, pipe } from 'rxjs';
import { logErrorAndRethrow } from './log-error-and-rethrow';

export function logErrorAndReturn<TReturn = unknown>(
  obsFactory: (err?: ApiErrorDto) => Observable<TReturn>
): MonoTypeOperatorFunction<TReturn> {
  return pipe(
    logErrorAndRethrow(),
    catchError((err: ApiErrorDto) => obsFactory(err))
  );
}
