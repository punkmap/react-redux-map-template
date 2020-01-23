/********************************************************************************************
CONFIG-REDUCER
Distributes the application config.
SET_CONFIG - sets the config 
********************************************************************************************/

import { SET_CONFIG } from '../actions/types';

const initialState = {
    config: '',
}
export default (state = initialState, action) => {
    switch(action.type) {
        case SET_CONFIG:
            return {
                ...state, 
                config: action.payload,
            };
        default:
            return state;
    }
}