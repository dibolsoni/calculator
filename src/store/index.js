import { applyMiddleware, createStore, } from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { observer } from "./auth/actions";
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

store.dispatch(observer());
sagaMiddleware.run(saga)

export default store;