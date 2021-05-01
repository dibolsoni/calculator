
import {
    newValue,
    addDigit,
    removeLastDigit,
    resetState,
    resetDigits,
    handleOperator,
    handleEqual,
    removeHistory, 
} from "./actions";
import {NEW_VALUE} from './actionTypes';

import {initialState} from "./calculatorReducer";
import store from '../index';
import { last } from "lodash";

const getState = () => store.getState().present;

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
    test('add digit only inc one digit number', () => {
        store.dispatch(addDigit(9));
        let expected = {...initialState, digits: [9]};
        expect(getState()).toEqual(expected);


        store.dispatch(addDigit(3));
        expected = {...initialState, digits: [9, 3]};
        expect(getState()).toEqual(expected);

        store.dispatch(addDigit("a"));
        expect(getState()).toEqual(expected);

        store.dispatch(addDigit(10));
        expect(getState()).toEqual(expected);
    });
    test('handle equal repeat last operator and number', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('*'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(getState().first_value).toBe(24);
        expect(getState().second_value).toBeNull();
        expect(getState().operator).toEqual('*');
        expect(last(getState().history).result).toBe(24);
        expect(last(getState().history)).toEqual({first_value: 12, second_value: 2, operator: '*', result: 24})

        const before = getState();
        store.dispatch(handleEqual());
        expect(getState()).not.toBe(before)

        expect(getState().first_value).toBe(48);
        expect(getState().second_value).toBeNull();
        expect(getState().operator).toEqual('*');
        expect(last(getState().history).result).toBe(48);
        expect(last(getState().history)).toEqual({first_value: 24, second_value: 2, operator: '*', result: 48})
    })

    test('handle decimal operations', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit('.'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(getState().first_value).toBe(2.4);
        expect(last(getState().history).result).toBe(2.4);


        store.dispatch(handleEqual());
        expect(getState().first_value).toBe(3.6);
        expect(last(getState().history).result).toEqual(3.6);

        store.dispatch(handleOperator('*'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(getState().first_value).toBe(7.2);
        expect(last(getState().history).result).toEqual(7.2);
    })  

    test('remove last digit', () => {
        store.dispatch(resetState());
        expect(getState()).toEqual(initialState);

        store.dispatch(addDigit(1));
        store.dispatch(addDigit(8));
        store.dispatch(removeLastDigit());
        let expected = {...initialState, digits: [1]};
        expect(getState()).toEqual(expected);

        store.dispatch(removeLastDigit());
        expected = {...initialState, digits: []};
        expect(getState()).toEqual(expected);

        store.dispatch(removeLastDigit());
        expected = {...initialState, digits: []};
        expect(getState()).toEqual(expected);
    })

    test('reset digits', () => {
        store.dispatch(addDigit(2));
        store.dispatch(addDigit(3));
        store.dispatch(addDigit(8));
        expect(getState().digits).toEqual([2, 3, 8])
        store.dispatch(resetDigits());
        expect(getState().digits).toEqual([]);
    })

    test('handle operator', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('+'));
        expect(getState().operator).toBe('+');
        expect(getState().first_value).toEqual(12);
    })

    test('handle operation sum', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('+'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        const last_operation = last(getState().history);
        expect(last_operation.first_value).toEqual(12);
        expect(last_operation.second_value).toEqual(2);
        expect(last_operation.operator).toEqual('+');
        expect(last(getState().history).result).toEqual(14);
        expect(getState().first_value).toEqual(14);

    })

    test('handle operation multiplication', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('*'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        const last_operation = last(getState().history);
        expect(last_operation.first_value).toBe(12);
        expect(last_operation.second_value).toBe(2);
        expect(last_operation.operator).toEqual('*');
        expect(last(getState().history).result).toBe(24);
        expect(getState().first_value).toEqual(24);

    })

    test('handle operation subtract', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('-'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        const last_operation = last(getState().history);
        expect(last_operation.first_value).toBe(12);
        expect(last_operation.second_value).toBe(2);
        expect(last_operation.operator).toEqual('-');
        expect(last(getState().history).result).toBe(10);
        expect(getState().first_value).toEqual(10);

    })
    
    test('handle operation division', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('/'));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        const last_operation = last(getState().history);
        expect(last_operation.first_value).toBe(12);
        expect(last_operation.second_value).toBe(2);
        expect(last_operation.operator).toEqual('/');
        expect(last_operation.result).toBe(6);
        expect(getState().first_value).toEqual(6);

    })

    test('handle change operator between a operation', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleOperator('+'));
        expect(getState().first_value).toBe(12);
        expect(getState().operator).toBe('+');
        expect(getState().second_value).toBeUndefined();

        store.dispatch(handleOperator('-'));
        expect(getState().first_value).toBe(12);
        expect(getState().operator).toBe('-');
        expect(getState().second_value).toBeUndefined();

        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(last(getState().history).result).toBe(10);
        expect(getState().first_value).toBe(10);
        expect(getState().operator).toEqual('-');
        expect(getState().second_value).toBeNull();
    })

    test('handle equal without operator', () => {
        store.dispatch(addDigit(1));
        store.dispatch(addDigit(2));
        store.dispatch(handleEqual());
        expect(getState().first_value).toBe(24);
        expect(getState().second_value).toBeNull();
        expect(getState().operator).toEqual('+');
        expect(last(getState().history).result).toBe(24);
        expect(last(getState().history)).toEqual({first_value: 12, second_value: 12, operator: '+', result: 24});

        store.dispatch(handleEqual());
        expect(getState().first_value).toBe(36);
        expect(getState().second_value).toBeNull();
        expect(getState().operator).toEqual('+');
        expect(last(getState().history).result).toBe(36);
        expect(last(getState().history)).toEqual({first_value: 24, second_value: 12, operator: '+', result: 36});
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
        expect(last(getState().history)).toStrictEqual(expected);
    })

    test('inc history after handle equal', () => {
        store.dispatch(addDigit(5));
        store.dispatch(handleOperator('+'));
        store.dispatch(addDigit(9));
        store.dispatch(handleEqual());
        expect(last(getState().history)).toStrictEqual({first_value: 5, operator: '+', second_value: 9, result:14})
    })

    test('remove a history by index', () => {
        store.dispatch(addDigit(5));
        store.dispatch(handleOperator('+'));
        store.dispatch(addDigit(9));
        store.dispatch(handleEqual());
        store.dispatch(handleEqual());
        store.dispatch(handleEqual());
        expect(getState().history).toHaveLength(3);

        store.dispatch(removeHistory(1));
        expect(getState().history).toHaveLength(2);
        const expected = [
            {
                first_value: 5, 
                operator: '+', 
                second_value: 9, 
                result:14
            },
            {
                first_value: 23,
                second_value: 9,
                operator: '+',
                result: 32
            }
        ]
        expect(getState().history).toStrictEqual(expected);

        store.dispatch(removeHistory());
        expect(getState().history).toHaveLength(1);
        expect(getState().history[0]).toStrictEqual({
            first_value: 23,
            second_value: 9,
            operator: '+',
            result: 32
        });

        store.dispatch(removeHistory());
        expect(getState().history).toHaveLength(0);

        store.dispatch(removeHistory());
        expect(getState().history).toHaveLength(0);     

        
    })
    
});


    