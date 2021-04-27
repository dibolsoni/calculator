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
    first_value: null,
    second_value: null, 
    operator: null,
    last_operator: null, 
    result: null
};


const calculatorReducer = (state = initialState, action) => {
    const {first_value, second_value, operator, digits, result} = state;

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
            const fv = result ? result : first_value ? first_value: getValueFromDigits(digits);
            const sv = second_value ? second_value : digits ? getValueFromDigits(digits) : first_value;
            const op = operator ? operator : DEFAULT_OPERATOR;
            const r = getResult(fv, op, sv);
            return {
                ...state, 
                digits: [],
                first_value: fv,
                second_value: sv,
                operator: op,
                result: r
            }


        //actions with payload
        case NEW_VALUE:
            return {...state, display: action.payload};
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
                first_value: first_value ? first_value : getValueFromDigits(digits),
                second_value: null,
                operator: action.payload,
                digits: []
            }

        default:
            return state;
    };
};

export default calculatorReducer;