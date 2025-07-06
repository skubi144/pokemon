import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {PokemonTeam} from '../model/pokemon-team';
import {Observable} from 'rxjs';
import {API_TYPE} from '../interceptors/base-api-interceptor';

@Injectable({
  providedIn: 'root'
})
export class PokemonTeamService {
  private context = new HttpContext().set(API_TYPE, 'local')

  constructor(private httpClient: HttpClient) {
  }

  addTeam(payload: Omit<PokemonTeam, 'id'>): Observable<PokemonTeam> {
    return this.httpClient.post<PokemonTeam>('/pokemon-team', payload, {context: this.context});
  }

  updateTeam(payload: Omit<PokemonTeam, 'id'>): Observable<PokemonTeam> {
    return this.httpClient.put<PokemonTeam>('/pokemon-team', payload, {context: this.context});
  }

  getTeam(id: number): Observable<PokemonTeam> {
    return this.httpClient.get<PokemonTeam>(`/pokemon-team/${id}`, {context: this.context});
  }

  getTeams(): Observable<PokemonTeam[]> {
    return this.httpClient.get<PokemonTeam[]>('/pokemon-team', {context: this.context});
  }
}
