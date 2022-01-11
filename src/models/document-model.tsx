import { LeagueModel } from "./league-model";

export interface DocumentModel{
    like: boolean;
    league: LeagueModel;
}

export interface HistoryModel{
    [key: string]: DocumentModel[];
}