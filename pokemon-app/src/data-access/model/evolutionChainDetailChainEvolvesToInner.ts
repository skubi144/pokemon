/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { EvolutionChainDetailChainEvolvesToInnerEvolutionDetailsInner } from './evolutionChainDetailChainEvolvesToInnerEvolutionDetailsInner';
import { AbilityDetailPokemonInnerPokemon } from './abilityDetailPokemonInnerPokemon';


export interface EvolutionChainDetailChainEvolvesToInner { 
    evolution_details: Array<EvolutionChainDetailChainEvolvesToInnerEvolutionDetailsInner>;
    is_baby: boolean;
    species: AbilityDetailPokemonInnerPokemon;
}

