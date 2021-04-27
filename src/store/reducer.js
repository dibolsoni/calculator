import {combineReducers} from 'redux';

import calculatorReducer from './calculator/calculatorReducer';

// const rootReducer = combineReducers({
//     display: calculatorReducer
// });

const rootReducer = calculatorReducer;

export default rootReducer;
