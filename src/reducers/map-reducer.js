/********************************************************************************************
MAPVIEW-REDUCER
Handles events from the MapView.
UPDATE_MAPCLICK_COORDINATES - fired when the map is clicked 
UPDATE_CENTERPOINT_COORDINATES - fired when the map extent changes to update the centerpoint. 
********************************************************************************************/



import { UPDATE_MAPCLICK_COORDINATES, UPDATE_CENTERPOINT_COORDINATES } from '../actions/types';

const initialState = {
    clickCoordinates: 'click map',
    centerpointCoordinates: '',
}
export default (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_MAPCLICK_COORDINATES:
            return {
                ...state, 
                clickCoordinates: action.payload,
            };
        case UPDATE_CENTERPOINT_COORDINATES:
            return {
                ...state,
                centerpointCoordinates: action.payload,
            }
        default:
            return state;
    }
}