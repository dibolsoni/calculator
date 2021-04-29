// import {combineReducers} from 'redux';
import reducerWithUndoRedo from './undoRedo/undoRedoReducer'
import calculatorReducer from './calculator/calculatorReducer';

// const rootReducer = combineReducers({
//     display: calculatorReducer
// });

const rootReducer = reducerWithUndoRedo(calculatorReducer);

export default rootReducer;
