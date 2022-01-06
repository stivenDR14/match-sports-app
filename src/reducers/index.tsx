import { StateModel } from "../models/state-model"
import { Authentication } from "../services/authentication-service"
import { InitialState } from "../store/configuration"

const reducer = (state= InitialState, action: { type: string; payload: any; }) => {
    switch(action.type){
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'SET_REGISTER':
            return {
                ...state,
                error: '',
                loading: true,
            } 
        case 'SET_LOGIN':
        
        return {
            ...state,
            error: '',
            loading: true,
        } 
        
        case 'SET_USER_SUCCESS':
    
        return {
            ...state,
            loading: false,
            error: '',
            user: action.payload,
        } 
        
        case 'SET_USER_ERROR':
    
        return {
            ...state,
            loading: false,
            error: action.payload,
            user: null,
        } 
        
        default:
            return state;
    }
    
}

export default reducer;