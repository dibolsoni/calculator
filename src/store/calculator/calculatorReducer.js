import { isNumber, last } from 'lodash';
import { MAX_N_UNDO } from '../undoRedo/undoRedoReducer';
import {
    RESET_STATE,
    RESET_VALUE,
    REMOVE_LAST_DIGIT,
    RESET_DIGITS,
    NEW_VALUE,
    ADD_DIGIT,
    HANDLE_OPERATOR,
    HANDLE_EQUAL,
    REMOVE_HISTORY
} from './actionTypes';

import {
    isDigitNumber,
    getValueFromDigits,
    DEFAULT_OPERATOR,
    getResult,
    hasDigits
} from './calculatorReducerHelper';


export const initialState = {
    display: 0,
    digits: [],
    first_value: undefined,
    second_value: undefined, 
    operator: undefined,
    history: [],
};


const calculatorReducer = (state = initialState, action) => {
    const {first_value, second_value, operator, digits, history} = state;
    const last_history = last(history) || initialState;
    switch(action.type){

        //actions without payload
        case RESET_STATE:
            return initialState;
        case RESET_VALUE:
            return {...state, display: 0};
        case REMOVE_LAST_DIGIT:
            if (!hasDigits(digits))
                return state;
            return {
                ...state,
                digits: state.digits.slice(0, state.digits.length - 1)
            }
        case RESET_DIGITS:
            return {...state, digits: []};
        case HANDLE_EQUAL:
            const joinedDigits =  getValueFromDigits(digits);
            const fv = isNumber(first_value) ?
                first_value : last_history.first_value ?
                    last_history.first_value : joinedDigits;
            const sv = isNumber(second_value) ? 
                second_value : hasDigits(digits) ? 
                    joinedDigits : last_history.second_value  ?
                        last_history.second_value :  null;
            const op = operator ?
                operator : last_history.operator ? 
                    last_history.operator : DEFAULT_OPERATOR;
            if (!isNumber(fv) || !isNumber(sv) || !op)
                return state;
            const r = getResult(fv, op, sv);
            const limitedHistory = history.length < MAX_N_UNDO ? history : history.slice(1);
            return {
                ...state, 
                digits: [],
                first_value: r,
                second_value: null,
                operator: op,
                history:[ ...limitedHistory, {
                    first_value: fv,
                    second_value: sv,
                    operator: op,
                    result: r
                }]
            }


        //actions with payload
        //NOT IMPLEMENTED YET
        case NEW_VALUE:
            return state;
        case ADD_DIGIT:
            if(!isDigitNumber(action.payload))
                return state;
            return {
                ...state, 
                digits: [...state.digits, action.payload]
            };
        case HANDLE_OPERATOR:
            return {
                ...state,
                first_value: first_value ? first_value : hasDigits(digits) ? getValueFromDigits(digits) : 0,
                second_value: second_value ? null : undefined,
                operator: action.payload,
                digits: []
            }

        case REMOVE_HISTORY:
            const newHistory = action.payload ? [
                ...history.slice(0, action.payload ), 
                ...history.slice(action.payload + 1 )
            ] : history.slice(1);
            return {
                ...state,
                history: newHistory
            }

        default:
            return state;
    };
};

export default calculatorReducer;