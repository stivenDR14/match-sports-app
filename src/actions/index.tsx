import { DocumentModel } from "../models/document-model"
import { LoginModel } from "../models/login-model"
import { Authentication } from "../services/authentication-service"
import { Database } from "../services/firestore-service"
import { SportsApi } from "../services/sports-service"

export const setTheme = (payload: any) =>({
    type: 'SET_THEME',
    payload,
})


export const setLoading = () =>{    
    return {
        type: 'SET_LOADING',
    }
}

export const setParameterTrigger = (data:boolean) =>{    
    return {
        type: 'SET_PARAMETER_TRIGGER',
        payload:data,
    }
}

export const setUserSuccess= (data:any) =>{
    return {
        type: 'SET_USER_SUCCESS',
        payload: data,
    }
}

export const setSportsSuccess= (data:any) =>{
    return {
        type: 'SET_SPORTS_SUCCESS',
        payload: data,
    }
}

export const setCountriesSuccess= (data:any) =>{
    return {
        type: 'SET_COUNTRIES_SUCCESS',
        payload: data,
    }
}

export const setLeaguesSuccess= (data:any) =>{
    return {
        type: 'SET_LEAGUES_SUCCESS',
        payload: data,
    }
}

export const setDocumentSuccess= (data:any) =>{
    return {
        type: 'SET_DOCUMENT_SUCCESS',
        payload: data,
    }
}

export const setHistorySuccess= (data:any) =>{
    return {
        type: 'SET_HISTORY_SUCCESS',
        payload: data,
    }
}

export const setError = (error: string) =>{
    return {
        type: 'SET_ERROR',
        payload:error
    }
}

export const setSport = (data: string) =>{
    return {
        type: 'SET_SPORT',
        payload:data
    }
}

export const setCountry = (data: string) =>{
    return {
        type: 'SET_COUNTRY',
        payload:data
    }
}

// async actions
export const fetchRegister=(payload: LoginModel)=>{
    return async(dispatch:any) => {
        dispatch(setLoading())
        const authLogin=new Authentication(payload.email, payload.password)
        try {
            const user=await authLogin.register()
            if(user===null) {
                dispatch(setError("User is not identified"))
              }else if(typeof(user)==="string"){
                dispatch(setError(user))
              }
              else{
                dispatch(setUserSuccess(user))                   
              }
        } catch (error:any) {
            dispatch(setError(error));
        }
        
        
    }
}


export const fetchGetSports=()=>{
    return async(dispatch:any) => {
        dispatch(setLoading())
        const sportsApi=new SportsApi()
        try {
            const sports=await sportsApi.getSports()
            dispatch(setSportsSuccess(sports))   
        } catch (error:any) {
            dispatch(setError(error));
        }
        
        
    }
}

export const fetchGetCountries=()=>{
    return async(dispatch:any) => {
        dispatch(setLoading())
        const sportsApi=new SportsApi()
        try {
            const countries=await sportsApi.getCountries()
            dispatch(setCountriesSuccess(countries))   
        } catch (error:any) {
            dispatch(setError(error));
        }
        
        
    }
}

export const fetchGetLeagues=(country: string, sport:string)=>{
    return async(dispatch:any) => {
        dispatch(setLoading())
        const sportsApi=new SportsApi()
        try {
            const leagues=await sportsApi.getLeagueByCountryBySport(country,sport)
            if(leagues.countrys===null){
                dispatch(setLeaguesSuccess([]))  
            }else{
                dispatch(setLeaguesSuccess(leagues))  
            }
             
        } catch (error:any) {
            dispatch(setError(error));
        }
        
        
    }
}

export const setSportDatabase=(data:DocumentModel,uid:string)=>{
    return async(dispatch:any) => {
        dispatch(setLoading())
        const firestoreApi=new Database(uid)
        try {
            const response=await firestoreApi.setSport(data)
            dispatch(setDocumentSuccess(response))   
        } catch (error:any) {
            dispatch(setError(error));
        }
        
        
    }
}

export const getHistoryUser=(uid:string)=>{
    return async(dispatch:any) => {
        dispatch(setLoading())
        const firestoreApi=new Database(uid)
        try {
            const response=await firestoreApi.getLeagues()
            dispatch(setHistorySuccess(response))   
        } catch (error:any) {
            dispatch(setError(error));
        }
        
        
    }
}

export const setLogout=()=>{
    return async(dispatch:any) => {
        dispatch(setLoading())
        const authLogin=new Authentication("", "")
        try {
            await authLogin.logout
            dispatch(setUserSuccess(null))   
        } catch (error:any) {
            dispatch(setError(error));
        }
        
        
    }
}




