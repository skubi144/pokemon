/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PokemonHabitatSummary } from './pokemonHabitatSummary';


export interface PaginatedPokemonHabitatSummaryList { 
    count?: number;
    next?: string;
    previous?: string;
    results?: Array<PokemonHabitatSummary>;
}

