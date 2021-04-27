import {
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
    removeLastDigit,
    getResultFromState
} from './displayReducerHelper';



export const initialState = {
    display: 0,
    digits: [],
    first_value: null,
    second_value: null, 
    operator: null,
    last_operator: null, 
    result: null
};

const displayReducer = (state = initialState, action) => {
    switch(action.type){
        //actions without payload
        case RESET_VALUE:
            return {...state, display: 0};
        case REMOVE_LAST_DIGIT:
            const {digits} = state;
            if (digits.length > 0) 
                return {
                    ...state, 
                    digits: digits.slice(0, digits.length - 1)
                };
            return state;
        case RESET_DIGITS:
            return {...state, digits: []};
            case HANDLE_EQUAL:
                let {first_value, second_value, operator} = state;
                if (!first_value)
                    first_value = getValueFromDigits(state);
                else if (!second_value)
                    second_value = getValueFromDigits(state);
                if (!operator)
                    operator = DEFAULT_OPERATOR;
                return {
                    ...state, 
                    digits: [],
                    first_value: first_value,
                    second_value: state.second_value,
                    result: getResultFromState(state)
                }


        //actions with payload
        case NEW_VALUE:
            return {...state, display: action.payload};
        case ADD_DIGIT:
            const numbers = new RegExp(/^[0-9]$/);
            if (!numbers.test(action.payload)) return state;
            return {...state, digits: [...state.digits, action.payload]};
        case HANDLE_OPERATOR:
            if (state.operator || state.result)
                return {
                    ...state,
                    first_value: state.first_value ? 
                        state.first_value : state.result ? 
                            state.result : null,
                    operator: action.payload,
                    digits: []
                }
            else {
                const joinedDigits = state.digits.join("");
                return {
                    ...state,
                    first_value: Number(joinedDigits),
                    operator: action.payload,
                    digits: []
                }
            }

        default:
            return state;
    };
};

export default displayReducer;