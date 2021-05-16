import { applyMiddleware, createStore, } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer';
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            sagaMiddleware,
        )
    )
);

sagaMiddleware.run(saga)

export default store;