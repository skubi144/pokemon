/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { BerryFlavorDetailBerriesInner } from './berryFlavorDetailBerriesInner';
import { BerryFlavorName } from './berryFlavorName';
import { ContestTypeSummary } from './contestTypeSummary';


export interface BerryFlavorDetail { 
    readonly id: number;
    name: string;
    berries: Array<BerryFlavorDetailBerriesInner>;
    contest_type: ContestTypeSummary;
    names: Array<BerryFlavorName>;
}

