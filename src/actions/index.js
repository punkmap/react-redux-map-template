import { FETCH_DATA } from '../actions/types';
import { UPDATE_COORDINATES } from '../actions/types';


export const updateCoordinates = (coordData) => {
    
    return dispatch => {
        dispatch({
            type: UPDATE_COORDINATES,
            payload: coordData,
        });
    };
}
// default function to display redux action format
export function defaultFunction() {
    let testVar = 'Hello';

    // action object format being return to a reducer
    return {
        type: FETCH_DATA,
        payload: testVar
    }
}