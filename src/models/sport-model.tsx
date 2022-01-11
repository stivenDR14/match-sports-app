export interface SportModel{
    [index: string]: string;
    idSport: string;
    strSport: string;
    strSportThumb: string;
    strSportIconGreen: string;
}

export class Sport implements SportModel{
    [index: string]: string;
    idSport: string="";
    strSport: string="";
    strSportThumb: string="";
    strSportIconGreen: string="";

    constructor(data?: SportModel) {
        Object.assign(this, data);
      }
}
