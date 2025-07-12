import {Injectable} from '@angular/core';
import {PokemonDetail} from '../model/pokemonDetail';
import {HttpClient} from '@angular/common/http';
import {map, Observable, shareReplay} from 'rxjs';
import {
  ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner
} from '../model/apiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner';

@Injectable({providedIn: 'root'})
export class PokemonService {
  private cache = new Map<string, Observable<unknown>>();

  constructor(private http: HttpClient) {
  }

  private getOrCache<T>(key: string, factory: () => Observable<T>): Observable<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key)! as Observable<T>;
    }
    const observable$ = factory().pipe(shareReplay(1));
    this.cache.set(key, observable$);
    return observable$;
  }

  getPokemon(id: string | number): Observable<PokemonDetail> {
    return this.getOrCache(`pokemon-${id}`, () =>
      this.http.get<PokemonDetail>(`/pokemon/${id}`)
    );
  }

  getPokemonAll(): Observable<ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[]> {
    return this.getOrCache('pokemon-all', () =>
      this.http.get<{
        results: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[]
      }>(
        '/pokemon?limit=100000&offset=0'
      ).pipe(map(({results}) => results))
    );
  }

  getBerriesAll(): Observable<ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[]> {
    return this.getOrCache('berries-all', () =>
      this.http.get<{
        results: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[]
      }>(
        '/berry?limit=100000&offset=0'
      ).pipe(map(({results}) => results))
    );
  }

  getPotionsAll(): Observable<ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[]> {
    return this.getOrCache('potions-all', () =>
      this.http.get<{
        items: ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner[]
      }>(
        '/item-category/healing?limit=100000&offset=0'
      ).pipe(map(({items}) => items))
    );
  }
}
