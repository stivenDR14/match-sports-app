import {createStore} from 'redux';
import { StateModel } from '../models/stateModel';
import reducer from '../reducers';
import { DarkColors } from '../utils/Colors';

const initialState:StateModel={
    theme: DarkColors,
}

export const store= createStore(reducer,initialState); 
