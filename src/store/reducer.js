import {combineReducers} from 'redux';

import displayReducer from './display/displayReducer';

// const rootReducer = combineReducers({
//     display: displayReducer
// });

const rootReducer = displayReducer;

export default rootReducer;
