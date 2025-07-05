import {HttpContextToken, HttpInterceptorFn} from '@angular/common/http';

type AvailableApiType = 'pokeapi' | 'local'
export const API_TYPE = new HttpContextToken<AvailableApiType>(() => 'pokeapi')

export const baseApiInterceptor: HttpInterceptorFn = (req, next) => {
  const urls: Record<AvailableApiType, string> = {
    pokeapi: 'https://pokeapi.co/api/v2',
    local: 'http://localhost:3000',
  }
  const baseUrl = urls[req.context.get(API_TYPE)]
  const url = req.url.startsWith('http') ? req.url : `${baseUrl}${req.url}`;
  const apiReq = req.clone({url});

  return next(apiReq);
};
