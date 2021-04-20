import reducer, {initialState} from "./displayReducer";
import {newValue, addDigit, removeLastDigit, resetDigits} from "./actions";
import {RESET_VALUE, NEW_VALUE} from './actionTypes';

describe('actions', () => {
    test('new value', () => {
        const expected = {type: NEW_VALUE, payload: 10};
        expect(newValue(10)).toEqual(expected);
    })
});

describe('DisplayReducer', () => {
    test('resets value', () => {
        expect(reducer(initialState, RESET_VALUE)).toEqual(initialState);
    });

    test('change the value', () => {
        const action = {type: NEW_VALUE, payload: 10};
        const expected = {...initialState, display: 10};
        
        expect(reducer(undefined, action)).toEqual(expected);
    });

    test('add digit only inc one number', () => {
        const digit = 5;
        let expected = {...initialState, digits: [digit]};
        let state = reducer(undefined, addDigit(digit));
        expect(state).toEqual(expected);

        const another_digit = 3;
        expected = {...initialState, digits: [digit, another_digit]};
        state = reducer(state, addDigit(another_digit));
        expect(state).toEqual(expected);

        state = reducer(state, addDigit("a"));
        expect(state).toEqual(expected);

        state = reducer(state, addDigit(10));
        expect(state).toEqual(expected);
    });

    test('remove last number', () => {
        let state = reducer(initialState, addDigit(3));
        state = reducer(state, addDigit(8));
        state = reducer(state, removeLastDigit());
        let expected = {...initialState, digits: [3]};
        expect(state).toEqual(expected)

        state = reducer(state, removeLastDigit());
        expected = {...initialState, digits: []};
        expect(state).toEqual(expected)

        state = reducer(state, removeLastDigit());
        expected = {...initialState, digits: []};
        expect(state).toEqual(expected)
    })

    test('reset digits', () => {
        let state = reducer(initialState, addDigit(2));
        state = reducer(state, addDigit(3));
        state = reducer(state, addDigit(8));
        state = reducer(state, resetDigits());
        const expected = initialState;
        expect(state).toEqual(expected);
    })

        

});