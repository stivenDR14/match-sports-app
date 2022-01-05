import { LoginModel } from "../models/login-model"
import { Authentication } from "../services/authentication-service"

export const setTheme = (payload: any) =>({
    type: 'SET_THEME',
    payload,
})


export const setRegister = async (payload: LoginModel ) =>{
    const authLogin=new Authentication(payload.email, payload.password)
    const user=await authLogin.register()
    return {
        type: 'SET_REGISTER',
        user,
    }
}
