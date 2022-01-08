import { SportModel } from "./sport-model";

export interface StateModel{
    theme?: any;  
    user?: any;
    loading?: boolean;
    error?:string;
    sports?:SportModel[];
}