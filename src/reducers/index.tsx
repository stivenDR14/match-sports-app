import { StateModel } from "../models/state-model"
import { Authentication } from "../services/authentication-service"

const reducer = (state: any, action: { type: string; payload: any; }) => {
    switch(action.type){
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'SET_REGISTER':
            
            return {
                ...state,
                user: action.payload
            } 
            
        default:
            return state;
    }
    
}

export default reducer;