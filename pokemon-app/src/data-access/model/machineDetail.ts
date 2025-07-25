/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { VersionGroupSummary } from './versionGroupSummary';
import { MoveSummary } from './moveSummary';
import { ItemSummary } from './itemSummary';


export interface MachineDetail { 
    readonly id: number;
    item: ItemSummary;
    version_group: VersionGroupSummary;
    move: MoveSummary;
}

