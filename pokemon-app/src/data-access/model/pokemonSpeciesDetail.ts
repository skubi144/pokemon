/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PokemonSpeciesDetailPalParkEncountersInner } from './pokemonSpeciesDetailPalParkEncountersInner';
import { PokemonSpeciesDetailVarietiesInner } from './pokemonSpeciesDetailVarietiesInner';
import { GenerationSummary } from './generationSummary';
import { PokemonFormDetailFormNamesInner } from './pokemonFormDetailFormNamesInner';
import { PokemonSpeciesDetailGeneraInner } from './pokemonSpeciesDetailGeneraInner';
import { PokemonSpeciesDescription } from './pokemonSpeciesDescription';
import { PokemonDexEntry } from './pokemonDexEntry';
import { PokemonSpeciesFlavorText } from './pokemonSpeciesFlavorText';
import { PokemonColorSummary } from './pokemonColorSummary';
import { PokemonShapeSummary } from './pokemonShapeSummary';
import { AbilityDetailPokemonInnerPokemon } from './abilityDetailPokemonInnerPokemon';
import { GrowthRateSummary } from './growthRateSummary';
import { PokemonHabitatSummary } from './pokemonHabitatSummary';
import { EvolutionChainSummary } from './evolutionChainSummary';
import { PokemonSpeciesSummary } from './pokemonSpeciesSummary';


export interface PokemonSpeciesDetail { 
    readonly id: number;
    name: string;
    order?: number | null;
    gender_rate?: number | null;
    capture_rate?: number | null;
    base_happiness?: number | null;
    is_baby?: boolean;
    is_legendary?: boolean;
    is_mythical?: boolean;
    hatch_counter?: number | null;
    has_gender_differences?: boolean;
    forms_switchable?: boolean;
    growth_rate: GrowthRateSummary;
    pokedex_numbers: Array<PokemonDexEntry>;
    egg_groups: Array<AbilityDetailPokemonInnerPokemon>;
    color: PokemonColorSummary;
    shape: PokemonShapeSummary;
    evolves_from_species: PokemonSpeciesSummary;
    evolution_chain: EvolutionChainSummary;
    habitat: PokemonHabitatSummary;
    generation: GenerationSummary;
    names: Array<PokemonFormDetailFormNamesInner>;
    pal_park_encounters: Array<PokemonSpeciesDetailPalParkEncountersInner>;
    form_descriptions: Array<PokemonSpeciesDescription>;
    flavor_text_entries: Array<PokemonSpeciesFlavorText>;
    genera: Array<PokemonSpeciesDetailGeneraInner>;
    varieties: Array<PokemonSpeciesDetailVarietiesInner>;
}

