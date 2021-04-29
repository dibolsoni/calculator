import { isNumber } from 'lodash';
import {
    RESET_STATE,
    RESET_VALUE,
    REMOVE_LAST_DIGIT,
    RESET_DIGITS,
    NEW_VALUE,
    ADD_DIGIT,
    HANDLE_OPERATOR,
    HANDLE_EQUAL
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
    last_operation: {
        first_value: undefined,
        second_value: undefined,
        operator: undefined,
        result: undefined
    },
};


const calculatorReducer = (state = initialState, action) => {
    const {first_value, second_value, operator, digits, last_operation} = state;

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
                first_value : last_operation.first_value ?
                    last_operation.first_value : joinedDigits;
            const sv = isNumber(second_value) ? 
                second_value : hasDigits(digits) ? 
                    joinedDigits : last_operation.second_value  ?
                        last_operation.second_value :  null;
            const op = operator ?
                operator : last_operation.operator ? 
                    last_operation.operator : DEFAULT_OPERATOR;
            if (!isNumber(fv) || !isNumber(sv) || !op)
                return state;
            const r = getResult(fv, op, sv);
            return {
                ...state, 
                digits: [],
                first_value: r,
                second_value: null,
                operator: op,
                last_operation: {
                    first_value: fv,
                    second_value: sv,
                    operator: op,
                    result: r
                }
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

        //history
        // case 

        default:
            return state;
    };
};

export default calculatorReducer;