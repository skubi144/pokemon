/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { LocationSummary } from './locationSummary';


export interface PaginatedLocationSummaryList { 
    count?: number;
    next?: string;
    previous?: string;
    results?: Array<LocationSummary>;
}

