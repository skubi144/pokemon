import {HttpInterceptorFn} from '@angular/common/http';
import {finalize} from 'rxjs';
import {inject} from '@angular/core';
import {LoadingService} from '../services/loading-service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoadingService)

  loader.increment();

  return next(req).pipe(finalize(() => loader.decrement()));
};
