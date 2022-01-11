import axios from "axios";
import { sportsApiConfig } from "../endpoints/sports-api";
import { Country, CountryModel } from "../models/country-model";
import { League, LeagueModel } from "../models/league-model";
import { Sport, SportModel } from "../models/sport-model";

export class SportsApi{
    constructor(){
    }
  
    public async getSports():Promise<any>{
      try{
        const sportsAux= await axios.get(sportsApiConfig.sports)
        const data: Array<any>=sportsAux.data.sports
        let arrayAux:SportModel[]=[]
        data.forEach((item)=>{
          let auxObject=new Sport()
          Object.keys(auxObject).forEach((key) => {
            auxObject[key] = item[key]
          })
          arrayAux.push(auxObject);     
        })
        return arrayAux;
      }catch (error:any) {
        console.log("error 1", error.message)
        const errorAux= error.message
        throw(errorAux);  
      }
      
    }  

    public async getCountries():Promise<any>{
      try{
        const countriesAux= await axios.get(sportsApiConfig.countries)
        const data: Array<any>=countriesAux.data.countries
        let arrayAux:CountryModel[]=[]
        data.forEach((item)=>{
          let auxObject=new Country()
          Object.keys(auxObject).forEach((key) => {
            auxObject[key] = item[key]
          })
          arrayAux.push(auxObject);     
        })
        return arrayAux;
      }catch (error:any) {
        console.log("error 1", error.message)
        const errorAux= error.message
        throw(errorAux);  
      }
      
    }  

    public async getLeagueByCountryBySport(country:string, sport: string):Promise<any>{
      try{
        const leagueAux= await axios.get(`https://www.thesportsdb.com/api/v1/json/2/search_all_leagues.php?c=${country}&s=${sport}`)
        const data: Array<any>=leagueAux.data.countrys
        if(data===null){
          return []
        }else{
          let arrayAux:LeagueModel[]=[]
          data.forEach((item)=>{
            let auxObject=new League()
            Object.keys(auxObject).forEach((key) => {
              auxObject[key] = item[key]===null?"":item[key]
            })
            arrayAux.push(auxObject);     
          })
          return arrayAux;
        }
        
      }catch (error:any) {
        console.log("error 1", error.message)
        const errorAux= error.message
        throw(errorAux);  
      }
      
    }  
  
  }