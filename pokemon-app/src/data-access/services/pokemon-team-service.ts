import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {PokemonTeam} from '../model/pokemon-team';
import {Observable} from 'rxjs';
import {API_TYPE} from '../interceptors/base-api-interceptor';

@Injectable({
  providedIn: 'root'
})
export class PokemonTeamService {

  constructor(private httpClient: HttpClient) {
  }

  addTeam(payload: Omit<PokemonTeam, 'id'>): Observable<PokemonTeam> {
    return this.httpClient.post<PokemonTeam>('/pokemon-team', payload, {context: new HttpContext().set(API_TYPE, 'local')});
  }
}
