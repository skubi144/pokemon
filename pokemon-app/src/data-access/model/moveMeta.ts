/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { MoveMetaCategorySummary } from './moveMetaCategorySummary';
import { MoveMetaAilmentSummary } from './moveMetaAilmentSummary';


export interface MoveMeta { 
    ailment: MoveMetaAilmentSummary;
    category: MoveMetaCategorySummary;
    min_hits?: number | null;
    max_hits?: number | null;
    min_turns?: number | null;
    max_turns?: number | null;
    drain?: number | null;
    healing?: number | null;
    crit_rate?: number | null;
    ailment_chance?: number | null;
    flinch_chance?: number | null;
    stat_chance?: number | null;
}

