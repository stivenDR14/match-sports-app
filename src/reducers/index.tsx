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
        case 'SET_LOADING':
        return {
            ...state,
            error: '',
            loading: true,
        } 

        case 'SET_SPORT':
        return {
            ...state,
            loading: false,
            error: '',
            sport: action.payload,
        } 

        case 'SET_COUNTRY':
        return {
            ...state,
            loading: false,
            error: '',
            country: action.payload,
        } 

        case 'SET_PARAMETER_TRIGGER':
        return {
            ...state,
            parameterTrigger: action.payload,
        } 
        
        case 'SET_USER_SUCCESS':
    
        return {
            ...state,
            loading: false,
            error: '',
            user: action.payload,
        } 

        case 'SET_SPORTS_SUCCESS':
    
        return {
            ...state,
            loading: false,
            error: '',
            sports: action.payload,
        } 

        case 'SET_COUNTRIES_SUCCESS':
    
            return {
                ...state,
                loading: false,
                error: '',
                countries: action.payload,
        } 

        case 'SET_LEAGUES_SUCCESS':
    
            return {
                ...state,
                loading: false,
                error: '',
                leagues: action.payload,
        } 

        case 'SET_DOCUMENT_SUCCESS':
    
        return {
            ...state,
            loading: false,
            error: '',
        } 

        case 'SET_HISTORY_SUCCESS':
    
        return {
            ...state,
            loading: false,
            error: '',
            history: action.payload
        } 
        
        case 'SET_ERROR':
    
        return {
            ...state,
            loading: false,
            error: action.payload,
        } 
        
        default:
            return state;
    }
    
}

export default reducer;