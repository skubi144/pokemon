import {
  PokemonDetail,
  StatDetail,
  StatSummary,
  TypeDetail,
  TypeSummary,
  SuperContestEffectDetail,
  SuperContestEffectSummary,
  VersionDetail,
  VersionSummary,
  VersionGroupDetail,
  VersionGroupSummary,
  AbilityDetailPokemonInnerPokemon,
  ApiV2PokemonEncountersRetrieve200ResponseInnerVersionDetailsInnerEncounterDetailsInnerConditionValuesInner,
  BerryDetail, PokemonSpeciesDetail, NatureDetail
} from '../model';
import {catchError, map, Observable, shareReplay, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PokemonService {
  private cache = new Map<string, Observable<unknown>>();

  constructor(private http: HttpClient) {
  }

  private getOrCache<T>(key: string, factory: () => Observable<T>): Observable<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key)! as Observable<T>;
    }
    const observable$ = factory().pipe(
      shareReplay(1),
      catchError(err => {
        this.cache.delete(key);
        return throwError(() => err);
      })
    );
    this.cache.set(key, observable$);
    return observable$;
  }

  invalidateCache(key: string) {
    this.cache.delete(key);
  }

  // Pokemon
  getPokemon(id: string | number): Observable<PokemonDetail> {
    return this.getOrCache(`pokemon-${id}`, () =>
      this.http.get<PokemonDetail>(`/pokemon/${id}`)
    );
  }

  getPokemonAll(): Observable<AbilityDetailPokemonInnerPokemon[]> {
    return this.getOrCache('pokemon-all', () =>
      this.http.get<{ results: AbilityDetailPokemonInnerPokemon[] }>('/pokemon?limit=100000&offset=0')
        .pipe(map(res => res.results))
    );
  }

  // Stats
  getStat(id: string | number): Observable<StatDetail> {
    return this.getOrCache(`stat-${id}`, () =>
      this.http.get<StatDetail>(`/stat/${id}`)
    );
  }

  getAllStats(): Observable<StatSummary[]> {
    return this.getOrCache('stats-all', () =>
      this.http.get<{ results: StatSummary[] }>('/stat?limit=1000&offset=0')
        .pipe(map(res => res.results))
    );
  }

  // Types
  getType(id: string | number): Observable<TypeDetail> {
    return this.getOrCache(`type-${id}`, () =>
      this.http.get<TypeDetail>(`/type/${id}`)
    );
  }

  getAllTypes(): Observable<TypeSummary[]> {
    return this.getOrCache('types-all', () =>
      this.http.get<{ results: TypeSummary[] }>('/type?limit=1000&offset=0')
        .pipe(map(res => res.results))
    );
  }

  // Super Contest Effects
  getSuperContestEffect(id: string | number): Observable<SuperContestEffectDetail> {
    return this.getOrCache(`super-contest-effect-${id}`, () =>
      this.http.get<SuperContestEffectDetail>(`/super-contest-effect/${id}`)
    );
  }

  getAllSuperContestEffects(): Observable<SuperContestEffectSummary[]> {
    return this.getOrCache('super-contest-effects-all', () =>
      this.http.get<{ results: SuperContestEffectSummary[] }>('/super-contest-effect?limit=1000&offset=0')
        .pipe(map(res => res.results))
    );
  }

  // Versions
  getVersion(id: string | number): Observable<VersionDetail> {
    return this.getOrCache(`version-${id}`, () =>
      this.http.get<VersionDetail>(`/version/${id}`)
    );
  }

  getAllVersions(): Observable<VersionSummary[]> {
    return this.getOrCache('versions-all', () =>
      this.http.get<{ results: VersionSummary[] }>('/version?limit=1000&offset=0')
        .pipe(map(res => res.results))
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

  getBerry(idOrName: string | number): Observable<BerryDetail> {
    return this.getOrCache(`berry-${idOrName}`, () =>
      this.http.get<BerryDetail>(
        `/berry/${idOrName}`,
      )
    );
  }

  getNature(name: string): Observable<NatureDetail> {
    return this.getOrCache(`nature-${name}`, () =>
      this.http.get<NatureDetail>(`/nature/${name}`)
    );
  }

  getPokemonSpecies(id: string | number): Observable<PokemonSpeciesDetail> {
    return this.getOrCache(`pokemon-species-${id}`, () =>
      this.http.get<PokemonSpeciesDetail>(`/pokemon-species/${id}`)
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

  // Version Groups
  getVersionGroup(id: string | number): Observable<VersionGroupDetail> {
    return this.getOrCache(`version-group-${id}`, () =>
      this.http.get<VersionGroupDetail>(`/version-group/${id}`)
    );
  }

  getAllVersionGroups(): Observable<VersionGroupSummary[]> {
    return this.getOrCache('version-groups-all', () =>
      this.http.get<{ results: VersionGroupSummary[] }>('/version-group?limit=1000&offset=0')
        .pipe(map(res => res.results))
    );
  }

  getAbility(id: string | number): Observable<AbilityDetailPokemonInnerPokemon> {
    return this.getOrCache(`ability-${id}`, () =>
      this.http.get<AbilityDetailPokemonInnerPokemon>(`/ability/${id}`)
    );
  }

  getAllAbilities(): Observable<AbilityDetailPokemonInnerPokemon[]> {
    return this.getOrCache('abilities-all', () =>
      this.http.get<{ results: AbilityDetailPokemonInnerPokemon[] }>('/ability?limit=1000&offset=0')
        .pipe(map(res => res.results))
    );
  }
}
