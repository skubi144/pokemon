/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AbilityDetailPokemonInnerPokemon } from './abilityDetailPokemonInnerPokemon';
import { EvolutionChainDetailChainEvolvesToInner } from './evolutionChainDetailChainEvolvesToInner';


export interface EvolutionChainDetailChain { 
    evolution_details: Array<any>;
    evolves_to: Array<EvolutionChainDetailChainEvolvesToInner>;
    is_baby: boolean;
    species: AbilityDetailPokemonInnerPokemon;
}

