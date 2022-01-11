export interface LeagueModel{
    idLeague: string;
    strSport: string;
    strLeague: string;
    strCountry: string;
    strBadge: string;
    strLogo: string;
    strFanart1: string;
}

export class League implements LeagueModel{
    [index: string]: string;
    idLeague: string="";
    strSport: string="";
    strLeague: string="";
    strCountry: string="";
    strBadge: string="";
    strLogo: string="";
    strFanart1: string="";

    constructor(data?: LeagueModel) {
        Object.assign(this, data);
      }
    
    
}
