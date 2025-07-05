import {Injectable} from '@angular/core';
import {PokemonDetail} from '../model/pokemonDetail';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {
  }

  getPokemon(id: PokemonDetail['id'] | PokemonDetail['name']) {
    return this.http.get<PokemonDetail>(`/pokemon/${id}`)
  }
}
