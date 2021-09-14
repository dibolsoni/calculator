import { call, put, takeLatest } from 'redux-saga/effects'
import { resetState, signInCompleted, signInFailed, signInRequested } from './actions';
import { OBSERVER, SIGN_IN, SIGN_OUT } from './actionTypes';

import firebase from 'firebase/app';
import 'firebase/firebase-auth'
import {firebaseConfig} from '../../config';

firebase.apps.length ?
    firebase.app() : firebase.initializeApp(firebaseConfig);

async function getUser(email, password) {
    let user, error;
    await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(credUser => {
                    user = credUser.user 
                })       
        })
        .catch(err => {error = {
            code: err.code,
            message: err.message
        }});
    return {user, error}
}

export function* authObserver() {
    let user;
    console.log('entrou authOberserver')
    firebase.auth().onAuthStateChanged(
        userLogged => {
            user = userLogged
        }
    )
    if (user) 
        yield put(signInCompleted(user))
    else {
        const error = {
            code: 'auth/observer',
            message: `Can't handle observer with user: ${user} `
        }
        yield put(signInFailed(error))
    }
}


// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* signInUser(action) {
    const {email, password} = action.payload;
    yield put(signInRequested(email, password))
    const result = yield call(getUser, email, password);
    const {user, error}= result;   
    if (user){
        yield put(signInCompleted(user))
    }
    else
        yield put(signInFailed(error))
}

export function* resetUserState(){
    yield put(resetState())
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* authSaga() {
  yield takeLatest(SIGN_IN, signInUser);
  yield takeLatest(SIGN_OUT, resetUserState);
  yield takeLatest(OBSERVER, authObserver)
}

export default authSaga;