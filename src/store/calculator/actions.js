import {
    NEW_VALUE, 
    RESET_STATE,
    RESET_VALUE,
    ADD_DIGIT,
    RESET_DIGITS,
    REMOVE_LAST_DIGIT,
    HANDLE_OPERATOR,
    HANDLE_EQUAL,
} from './actionTypes';

export const resetState = () => ({
    type: RESET_STATE,
});

export const resetValue = () => ({
    type: RESET_VALUE,
});

export const newValue = (value) => ({
    type: NEW_VALUE,
    payload: value
});

export const addDigit = (digit) => ({
    type: ADD_DIGIT,
    payload: digit
});
export const removeLastDigit = () => ({
    type: REMOVE_LAST_DIGIT
});
export const resetDigits = () => ({
    type: RESET_DIGITS
});
export const handleOperator = (operator) => ({
    type: HANDLE_OPERATOR,
    payload: operator
});

export const handleEqual = () => ({
    type: HANDLE_EQUAL,
});
