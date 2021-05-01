import { addDigit } from '../calculator/actions';
import { redo, reset, undo } from './actions';
import { initialState } from '../calculator/calculatorReducer';
import store from '../index';
import {MAX_N_UNDO} from './undoRedoReducer';

describe('history reducer', () => {
    test('handle Undo', () => {
        store.dispatch(addDigit(1));
        const calcFirstState = store.getState().present;
        expect(store.getState().past[0]).toBe(initialState);
        expect(store.getState().present).toBe(calcFirstState);
        store.dispatch(addDigit(2));
        const calcSecondState = store.getState().present;
        expect(store.getState().present).toBe(calcSecondState);
        expect(store.getState().past[1]).toBe(calcFirstState);
        store.dispatch(undo());
        const expected = {
            past: [initialState],
            present: calcFirstState,
            future: [calcSecondState]
        }
        expect(store.getState()).toStrictEqual(expected)
        
    })

    test('handle Redo', () => {
        const {past, present, future} = store.getState();
        store.dispatch(redo())
        const expected = {
            past: [...past, present],
            present: future[0],
            future: []
        }
        expect(store.getState()).toStrictEqual(expected);
        
    })

    test('undo with more than the default maximum', () => {
        store.dispatch(reset());
        store.dispatch(addDigit(9));
        for (let index = 0; index < MAX_N_UNDO + 1; index++) {
            store.dispatch(addDigit(1));
        }
        expect(store.getState().past.length).toBe(300);
        expect(store.getState().past[0].digits[0]).toStrictEqual(9);
        for (let index = 0; index < MAX_N_UNDO + 1; index++) {
            store.dispatch(undo());
        }
        expect(store.getState().past.length).toBe(0);
        expect(store.getState().present.digits.length).toBe(2);
        expect(store.getState().present.digits).toStrictEqual([9,1]);
    })
})