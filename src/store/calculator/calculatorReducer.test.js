
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
    test('resets value', () => {
        expect(store.getState()).toEqual(initialState);
    });

    
    test('change the value', () => {
        const action = {type: NEW_VALUE, payload: 10};
        const expected = {...initialState, display: 10};
        store.dispatch(action);
        expect(store.getState()).toEqual(expected);
    });

    test('add digit only inc one digit number', () => {
        store.dispatch(addDigit(9));
        let expected = {...initialState, digits: [9]};
        expect(store.getState()).toEqual(expected);


        store.dispatch(addDigit(3));
        expected = {...initialState, digits: [9, 3]};
        expect(store.getState()).toEqual(expected);

        store.dispatch(addDigit("a"));
        expect(store.getState()).toEqual(expected);

        store.dispatch(addDigit(10));
        expect(store.getState()).toEqual(expected);
    });

    test('remove last digit', () => {
        store.dispatch(resetState());
        expect(store.getState()).toEqual(initialState);

        store.dispatch(addDigit(1));
        store.dispatch(addDigit(8));
        store.dispatch(removeLastDigit());
        let expected = {...initialState, digits: [1]};
        expect(store.getState()).toEqual(expected);

        store.dispatch(removeLastDigit());
        expected = {...initialState, digits: []};
        expect(store.getState()).toEqual(expected);

        store.dispatch(removeLastDigit());
        expected = {...initialState, digits: []};
        expect(store.getState()).toEqual(expected);
    })

    test('reset digits', () => {
        store.dispatch(addDigit(2));
        store.dispatch(addDigit(3));
        store.dispatch(addDigit(8));
        expect(store.getState().digits).toEqual([2, 3, 8])
        store.dispatch(resetDigits());
        expect(store.getState().digits).toEqual([]);
    })

    test('handle operator', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('+'));
        expect(store.getState().operator).toBe('+');
        expect(store.getState().first_value).toEqual(12);
    })

    test('handle operation sum', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator());
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toEqual(12);
        expect(store.getState().second_value).toEqual(2);
        expect(store.getState().operator).toEqual('+');
        expect(store.getState().result).toEqual(14);
    })

    test('handle operation multiplication', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('*'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(12);
        expect(store.getState().second_value).toBe(2);
        expect(store.getState().operator).toEqual('*');
        expect(store.getState().result).toBe(24);
    })

    test('handle operation subtract', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('-'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(12);
        expect(store.getState().second_value).toBe(2);
        expect(store.getState().operator).toEqual('-');
        expect(store.getState().result).toBe(10);
    })

    test('handle operation division', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('/'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(12);
        expect(store.getState().second_value).toBe(2);
        expect(store.getState().operator).toEqual('/');
        expect(store.getState().result).toBe(6);
    })

    test('handle change operator', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('+'));
        expect(store.getState().first_value).toBe(12);
        expect(store.getState().operator).toBe('+');
        expect(store.getState().second_value).toBeNull();

        store.dispatch(handleOperator('-'));
        expect(store.getState().first_value).toBe(12);
        expect(store.getState().operator).toBe('-');
        expect(store.getState().second_value).toBeNull();
    })

    test('handle equal without operator', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(12);
        expect(store.getState().second_value).toBe(12);
        expect(store.getState().operator).toEqual('+');
        expect(store.getState().result).toBe(24);
    })

    test('handle equal repeat last operator and number', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('*'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(12);
        expect(store.getState().second_value).toBe(2);
        expect(store.getState().operator).toEqual('*');
        expect(store.getState().result).toBe(24);

        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(24);
        expect(store.getState().second_value).toBe(2);
        expect(store.getState().operator).toEqual('*');
        expect(store.getState().result).toBe(48);
    })

    test('handle decimal operations', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit('.'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(1.2);
        expect(store.getState().second_value).toBe(1.2);
        expect(store.getState().operator).toEqual('+');
        expect(store.getState().result).toBe(2.4);

        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(2.4);
        expect(store.getState().second_value).toBe(1.2);
        expect(store.getState().operator).toEqual('+');
        //use to fixed to round decimals
        expect(store.getState().result.toFixed(2)).toEqual(3.6.toFixed(2));

        store.dispatch(handleOperator('*'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value.toFixed(2)).toBe(3.6.toFixed(2));
        expect(store.getState().second_value).toBe(2);
        expect(store.getState().operator).toEqual('*');
        //use to fixed to round decimals
        expect(store.getState().result.toFixed(2)).toEqual(7.2.toFixed(2));
    })
        
});