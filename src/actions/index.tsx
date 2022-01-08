import { LoginModel } from "../models/login-model"
import { Authentication } from "../services/authentication-service"
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

export const setUserSuccess= (user:any) =>{
    return {
        type: 'SET_USER_SUCCESS',
        payload: user,
    }
}

export const setSportsSuccess= (user:any) =>{
    return {
        type: 'SET_SPORTS_SUCCESS',
        payload: user,
    }
}

export const setError = (error: string) =>{
    return {
        type: 'SET_ERROR',
        payload:error
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




