import { addDigit } from '../calculator/actions';
import { redo, reset, undo } from './actions';
import { initialState } from '../calculator/calculatorReducer';
import store from '../index';
import {MAX_N_UNDO} from './undoRedoReducer';

const getState = () => store.getState().calculator;

describe('history reducer', () => {
    test('handle Undo', () => {
        store.dispatch(addDigit(1));
        const calcFirstState = getState().present;
        expect(getState().past[0]).toBe(initialState);
        expect(getState().present).toBe(calcFirstState);
        store.dispatch(addDigit(2));
        const calcSecondState = getState().present;
        expect(getState().present).toBe(calcSecondState);
        expect(getState().past[1]).toBe(calcFirstState);
        store.dispatch(undo());
        const expected = {
            past: [initialState],
            present: calcFirstState,
            future: [calcSecondState]
        }
        expect(getState()).toStrictEqual(expected)
        
    })

    test('handle Redo', () => {
        const {past, present, future} = getState();
        store.dispatch(redo())
        const expected = {
            past: [...past, present],
            present: future[0],
            future: []
        }
        expect(getState()).toStrictEqual(expected);
        
    })

    test('undo with more than the default maximum', () => {
        store.dispatch(reset());
        store.dispatch(addDigit(9));
        for (let index = 0; index < MAX_N_UNDO + 1; index++) {
            store.dispatch(addDigit(1));
        }
        expect(getState().past.length).toBe(300);
        expect(getState().past[0].digits[0]).toStrictEqual(9);
        for (let index = 0; index < MAX_N_UNDO + 1; index++) {
            store.dispatch(undo());
        }
        expect(getState().past.length).toBe(0);
        expect(getState().present.digits.length).toBe(2);
        expect(getState().present.digits).toStrictEqual([9,1]);
    })
})