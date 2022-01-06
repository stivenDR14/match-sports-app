import {applyMiddleware, createStore} from 'redux';
import { StateModel } from '../models/state-model';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import { DarkColors } from '../utils/Colors';

export const InitialState:StateModel={
    theme: DarkColors,
    user: null,
    error:'',
    loading:false,
}

const _applyMiddleware = applyMiddleware


export const store= createStore(reducer,_applyMiddleware(thunk)); 


store.subscribe(()=> console.log("store: ",store.getState()))
