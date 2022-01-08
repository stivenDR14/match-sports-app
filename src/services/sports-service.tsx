import axios from "axios";
import { sportsApiConfig } from "../endpoints/sports-api";
import { SportModel } from "../models/sport-model";

export class SportsApi{
    constructor(){
    }
  
    public async getSports():Promise<any>{
      try{
        const sportsAux= await axios.get(sportsApiConfig.sports)
        const sportsFinal: SportModel=sportsAux.data
        return sportsFinal;
      }catch (error:any) {
        console.log("error 1", error.message)
        const errorAux= error.message
        throw(errorAux);  
      }
      
    }  
  
  }