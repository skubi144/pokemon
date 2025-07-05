import {HttpInterceptorFn} from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'https://pokeapi.co/api/v2';
  const url = req.url.startsWith('http') ? req.url : `${baseUrl}${req.url}`;
  const apiReq = req.clone({url});

  return next(apiReq);
};
