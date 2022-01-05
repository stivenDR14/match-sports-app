import {createStore} from 'redux';
import { StateModel } from '../models/state-model';
import reducer from '../reducers';
import { DarkColors } from '../utils/Colors';

const initialState:StateModel={
    theme: DarkColors,
    user: null,
}

export const store= createStore(reducer,initialState); 
