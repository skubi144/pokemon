import {Injectable} from '@angular/core';
import {PokemonDetail} from '../model/pokemonDetail';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner
} from '../model/apiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {
  }

  getPokemon(id: PokemonDetail['id'] | PokemonDetail['name']) {
    return this.http.get<PokemonDetail>(`/pokemon/${id}`)
  }

  getPokemonAll(): Observable<ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[]> {
    return this.http.get<{
      results: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[]
    }>(`/pokemon?limit=100000&offset=0`).pipe(map(({results}) =>
      results
    ));
  }
}
