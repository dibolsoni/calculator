
import {
    newValue,
    addDigit,
    removeLastDigit,
    resetState,
    resetDigits,
    handleOperator,
    handleEqual, 
} from "./actions";
import {NEW_VALUE} from './actionTypes';

import {initialState} from "./calculatorReducer";
import store from '../index';


describe('actions', () => {
    test('new value', () => {
        const expected = {type: NEW_VALUE, payload: 10};
        expect(newValue(10)).toEqual(expected);
    })
});

describe('DisplayReducer', () => {
    beforeEach(() => {
        store.dispatch(resetState());
    });


    test('handle operation starting with operator', () => {
        store.dispatch(handleOperator('-'));
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        const expected = {
            first_value: 0,
            second_value: 12,
            operator:'-',
            result: -12
        }
        expect(store.getState().last_operation).toStrictEqual(expected);
    })

        
});


    