import {NEW_VALUE, RESET_VALUE} from './actionTypes';

export const resetValue = () => ({
    type: RESET_VALUE,
});

export const newValue = (value) => ({
    type: NEW_VALUE,
    payload: value
});

