import { UPDATE_COORDINATES } from '../actions/types';

const initialState = {
    coordinates: 'click map'
}
export default (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_COORDINATES:
            return {
                ...state, 
                coordinates: action.payload,
            };
        default:
            return state;
    }
}