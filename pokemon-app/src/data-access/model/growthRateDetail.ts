/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Experience } from './experience';
import { GrowthRateDescription } from './growthRateDescription';
import { PokemonSpeciesSummary } from './pokemonSpeciesSummary';


export interface GrowthRateDetail { 
    readonly id: number;
    name: string;
    formula: string;
    descriptions: Array<GrowthRateDescription>;
    levels: Array<Experience>;
    pokemon_species: Array<PokemonSpeciesSummary>;
}

