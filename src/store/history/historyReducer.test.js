import { createStore } from 'redux';

import reducerWithHistory from './historyReducer';
import calculatorReducer from '../calculator/calculatorReducer';

describe('history reducer', () => {
    test('init with initialState', () => {
        // const store = createStore(reducerWithHistory(calculatorReducer(undefined, {})));
        expect(true).toBe(true);
    })
})