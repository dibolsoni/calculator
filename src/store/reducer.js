// import {combineReducers} from 'redux';
import reducerWithUndoRedo from './undoRedo/undoRedoReducer'
import calculatorReducer from './calculator/calculatorReducer';
import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
    calculator: reducerWithUndoRedo(calculatorReducer),
    auth: authReducer
});



export default rootReducer;
