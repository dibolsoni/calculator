import {
    NEW_VALUE, 
    RESET_VALUE,
    ADD_DIGIT,
    RESET_DIGITS,
    REMOVE_LAST_DIGIT
} from './actionTypes';

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

