import { addDigit } from '../calculator/actions';
import { initialState } from '../calculator/calculatorReducer';
import store from '../index';
import { redo, reset, undo } from './actions';

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
})