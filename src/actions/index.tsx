import { LoginModel } from "../models/login-model"
import { Authentication } from "../services/authentication-service"

export const setTheme = (payload: any) =>({
    type: 'SET_THEME',
    payload,
})


export const setRegister = () =>{    
    return {
        type: 'SET_REGISTER',
    }
}

export const setLogin = () =>{
    return {
        type: 'SET_LOGIN',
    }
}


export const setUserSuccess= (user:any) =>{
    return {
        type: 'SET_USER_SUCCESS',
        payload: user,
    }
}

export const setUserError = (error: string) =>{
    return {
        type: 'SET_USER_ERROR',
        payload:error
    }
}

// async actions
export const fetchRegister=(payload: LoginModel)=>{
    return async(dispatch:any) => {
        dispatch(setRegister())
        const authLogin=new Authentication(payload.email, payload.password)
        try {
            const user=await authLogin.register()
            if(user===null) {
                dispatch(setUserError("User is not identified"))
              }else if(typeof(user)==="string"){
                dispatch(setUserError(user))
              }
              else{
                dispatch(setUserSuccess(user))                   
              }
        } catch (error:any) {
            dispatch(setUserError(error));
        }
        
        
    }
}



