/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { MoveLearnMethodName } from './moveLearnMethodName';
import { AbilityDetailPokemonInnerPokemon } from './abilityDetailPokemonInnerPokemon';
import { MoveLearnMethodDescription } from './moveLearnMethodDescription';


export interface MoveLearnMethodDetail { 
    readonly id: number;
    name: string;
    names: Array<MoveLearnMethodName>;
    descriptions: Array<MoveLearnMethodDescription>;
    version_groups: Array<AbilityDetailPokemonInnerPokemon>;
}

