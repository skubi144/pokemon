/**
 * PokéAPI
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { MoveSummary } from './moveSummary';


export interface PaginatedMoveSummaryList { 
    count?: number;
    next?: string;
    previous?: string;
    results?: Array<MoveSummary>;
}

