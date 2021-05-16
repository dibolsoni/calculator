import firebase from 'firebase/app';
import 'firebase/firebase-auth'

import {firebaseConfig} from '../../config';
import { initialState } from './authReducer';

firebase.initializeApp(firebaseConfig);

export async function getUserByEmailAndPassword(email, password) {
    let user, error;
    await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(credUser => {
        user = {
            email: credUser.user.email,
            password: password,
        }
    })
    .catch(err => {error = {
        code: err.code,
        message: err.message
    }});
    return {user, error}
}

export async function signOut() {
    let user, error;
    await firebase
        .auth()
        .signOut()
        .then(() => {
        user = {
            email: null,
            password: null
        }
      })
      .catch(err => {error = {
        code: err.code,
        message: err.message
    }});
    return {user, error}
}

export function onStateChanged(loggedUser) {
    let user = loggedUser; 
    let error = initialState.error;
    firebase
        .auth()
        .onAuthStateChanged( (authUser) => {
            console.log('comparing ', authUser.email, loggedUser.email)
            if(authUser.email !== loggedUser.email)
                user = {
                    email: null,
                    password: null
                }
                error = {
                    code: 'auth/user-was-signed-out',
                    message: 'The user was signed out. Please sign in again'
                }
        })
    return {user, error}
}