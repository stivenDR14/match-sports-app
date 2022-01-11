export interface CountryModel{
    name_en: string;
    [index: string]: string;
}

export class Country implements CountryModel{
    [index: string]: string;
    name_en: string="";

    constructor(data?: CountryModel) {
        Object.assign(this, data);
      }
    
}
