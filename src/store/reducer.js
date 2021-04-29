// import {combineReducers} from 'redux';
import reducerWithHistory from './history/historyReducer'
import calculatorReducer from './calculator/calculatorReducer';

// const rootReducer = combineReducers({
//     display: calculatorReducer
// });

// const rootReducer = reducerWithHistory(calculatorReducer);
const rootReducer = calculatorReducer;

export default rootReducer;
