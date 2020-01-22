import { combineReducers } from 'redux';

// calling the default reducer to create a link
import defaultReducer from './default-reducer';
import mapReducer from './map-reducer';

const rootReducers = combineReducers({
    // add reducer files references here
    default: defaultReducer, 
    map: mapReducer
});

export default rootReducers;