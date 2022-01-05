const reducer = (state: any, action: { type: string; payload: any; }) => {
    switch(action.type){
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'SET_INTRO':
            return {
                ...state,
                intro: action.payload
            }
        default:
            return state;
    }
    
}

export default reducer;