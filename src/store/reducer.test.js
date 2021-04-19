import reducer, {initialState} from "./reducer";
import {newValue} from "./actions";
import {RESET_VALUE, NEW_VALUE} from './actionTypes';

describe('actions', () => {
    test('new value', () => {
        const expected = {type: NEW_VALUE, payload: 10};
        expect(newValue(10)).toEqual(expected);
    })
});

describe('Reducer', () => {
    test('initiate it with 0', () => {
        expect(reducer(undefined, RESET_VALUE)).toEqual(initialState);
    });

    test('change the value', () => {
        const action = {type: NEW_VALUE, payload: 10};
        const expected = {display: 10};
        
        expect(reducer(undefined, action)).toEqual(expected);
    });
});