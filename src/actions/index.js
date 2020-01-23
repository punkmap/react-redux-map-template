import { FETCH_DATA } from '../actions/types';
import { UPDATE_MAPCLICK_COORDINATES, UPDATE_CENTERPOINT_COORDINATES } from '../actions/types';
import { SET_CONFIG } from '../actions/types';


export const updateMapclickCoordinates = (coordData) => {
    
    return dispatch => {
        dispatch({
            type: UPDATE_MAPCLICK_COORDINATES,
            payload: coordData,
        });
    };
};
export const updateCenterpointCoordinates = (coordData) => {
    
    return dispatch => {
        dispatch({
            type: UPDATE_CENTERPOINT_COORDINATES,
            payload: coordData,
        });
    };
}
export const setConfig = (config) => {
    return dispatch => {
        dispatch({
            type: SET_CONFIG,
            payload: config,
        });
    };
}
// default function to display redux action format
export function defaultFunction() {
    console.log('defaultFunction');
    let testVar = 'Hello';

    // action object format being return to a reducer
    return {
        type: FETCH_DATA,
        payload: testVar
    }
}