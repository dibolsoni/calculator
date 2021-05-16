import { all } from "@redux-saga/core/effects";
import authSaga from "./auth/sagas";


export default function* rootSaga() {
    yield all([
      authSaga(),
    ])
}