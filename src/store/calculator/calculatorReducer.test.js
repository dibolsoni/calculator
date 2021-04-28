
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
        store.dispatch(handleOperator('+'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        const {last_operation} = store.getState();
        expect(last_operation.first_value).toEqual(12);
        expect(last_operation.second_value).toEqual(2);
        expect(last_operation.operator).toEqual('+');
        expect(store.getState().last_operation.result).toEqual(14);
        expect(store.getState().first_value).toEqual(14);

    })

    test('handle operation multiplication', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('*'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        const {last_operation} = store.getState();
        expect(last_operation.first_value).toBe(12);
        expect(last_operation.second_value).toBe(2);
        expect(last_operation.operator).toEqual('*');
        expect(store.getState().last_operation.result).toBe(24);
        expect(store.getState().first_value).toEqual(24);

    })

    test('handle operation subtract', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('-'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        const {last_operation} = store.getState();
        expect(last_operation.first_value).toBe(12);
        expect(last_operation.second_value).toBe(2);
        expect(last_operation.operator).toEqual('-');
        expect(store.getState().last_operation.result).toBe(10);
        expect(store.getState().first_value).toEqual(10);

    })

    test('handle operation division', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('/'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        const {last_operation} = store.getState();
        expect(last_operation.first_value).toBe(12);
        expect(last_operation.second_value).toBe(2);
        expect(last_operation.operator).toEqual('/');
        expect(store.getState().last_operation.result).toBe(6);
        expect(store.getState().first_value).toEqual(6);

    })

    test('handle change operator between a operation', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('+'));
        expect(store.getState().first_value).toBe(12);
        expect(store.getState().operator).toBe('+');
        expect(store.getState().second_value).toBeUndefined();

        store.dispatch(handleOperator('-'));
        expect(store.getState().first_value).toBe(12);
        expect(store.getState().operator).toBe('-');
        expect(store.getState().second_value).toBeUndefined();

        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().last_operation.result).toBe(10);
        expect(store.getState().first_value).toBe(10);
        expect(store.getState().operator).toEqual('-');
        expect(store.getState().second_value).toBeNull();
    })

    test('handle equal without operator', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(24);
        expect(store.getState().second_value).toBeNull();
        expect(store.getState().operator).toEqual('+');
        expect(store.getState().last_operation.result).toBe(24);
        expect(store.getState().last_operation).toEqual({first_value: 12, second_value: 12, operator: '+', result: 24});

        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(36);
        expect(store.getState().second_value).toBeNull();
        expect(store.getState().operator).toEqual('+');
        expect(store.getState().last_operation.result).toBe(36);
        expect(store.getState().last_operation).toEqual({first_value: 24, second_value: 12, operator: '+', result: 36});

    })



    test('handle equal repeat last operator and number', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('*'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(24);
        expect(store.getState().second_value).toBeNull();
        expect(store.getState().operator).toEqual('*');
        expect(store.getState().last_operation.result).toBe(24);
        expect(store.getState().last_operation).toEqual({first_value: 12, second_value: 2, operator: '*', result: 24})

        const before = store.getState();
        store.dispatch(handleEqual());
        expect(store.getState()).not.toBe(before)

        expect(store.getState().first_value).toBe(48);
        expect(store.getState().second_value).toBeNull();
        expect(store.getState().operator).toEqual('*');
        expect(store.getState().last_operation.result).toBe(48);
        expect(store.getState().last_operation).toEqual({first_value: 24, second_value: 2, operator: '*', result: 48})
    })

    test('handle decimal operations', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit('.'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(2.4);
        expect(store.getState().last_operation.result).toBe(2.4);
        

        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(3.6);
        expect(store.getState().last_operation.result).toEqual(3.6);

        store.dispatch(handleOperator('*'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(store.getState().first_value).toBe(7.2);
        expect(store.getState().last_operation.result).toEqual(7.2);
    })

        
});