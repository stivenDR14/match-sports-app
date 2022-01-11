import { CountryModel } from "./country-model";
import { LeagueModel } from "./league-model";
import { SportModel } from "./sport-model";

export interface StateModel{
    theme?: any;  
    user?: any;
    loading?: boolean;
    error?:string;
    sports?:SportModel[];
    countries?: CountryModel[];
    leagues?: LeagueModel[];
    sport?: string;
    country?: string;
    parameterTrigger?:boolean;
}