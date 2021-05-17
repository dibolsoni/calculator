import store from '../index';
import { observer, resetState, signIn, signInRequested, signOut } from './actions';
import { SIGN_IN, SIGN_IN_COMPLETED, SIGN_IN_REQUESTED } from './actionTypes';
import {signInUser} from './sagas';

const getState = () => store.getState().auth;


describe('Authentication Reducer', () => {
    beforeEach(() => {
        store.dispatch(resetState());
    })

    test('an action', () => {
        const expected = {type: SIGN_IN, payload: {email: 'a', password: 'b'}};
        expect(signIn('a', 'b')).toStrictEqual(expected);
    })

    // test('async action', async () => {
    //     const gen = signInUser(signInRequested('c', 'd'))
    //     expect(gen.next().done).toBeFalsy();
    //     expect(gen.next().done).toBeFalsy();
    //     expect(gen.next()).toBe({})
    // })
    // test('sing in to firebase',  async () => {
    //     const email = "dibolsoni@gmail.com";
    //     const password = "123321";
    //     store.dispatch(signIn(email, password))
    //     const state = await getState();
    //     expect(state.error.code).toBeUndefined();
    //     expect(state.user).toStrictEqual({
    //         email,
    //         password,
    //     })
    // })

    // test('sign in got an error with wrong pass',  async () => {
    //     const email = "dibolsoni@gmail.com";
    //     const password = "111";
    //     store.dispatch(signIn(email, password))
    //     const state = await getState();
    //     expect(state.error).toStrictEqual({
    //         ...state.error,
    //         code: "auth/wrong-password"
    //     })
    //     expect(state.user.email).toBeUndefined();
    // })

    // test('sign in got an error with wrong user',  async () => {
    //     const email = "dibolsonssi@gmail.com";
    //     const password = "111";
    //     store.dispatch(signIn(email, password))
    //     const state = await getState();
    //     expect(state.error).toStrictEqual({
    //         ...state.error,
    //         code: "auth/user-not-found"
    //     })
    //     expect(state.user.email).toBeUndefined();
    // })



    // test('sign out user', async () => {
    //     const email = "dibolsoni@gmail.com";
    //     const password = "123321";
    //     store.dispatch(signIn(email, password))
    //     let state = await getState();
    //     expect(state.error.code).toBeUndefined();
    //     expect(state.user.email).toStrictEqual(email)

    //     store.dispatch(signOut());
    //     state = await getState();
    //     expect(state.user).toStrictEqual({
    //         email: null,
    //         password: null
    //     });
    //     expect(state.error).toStrictEqual({
    //         code: undefined,
    //         message: undefined
    //     })
    // })

    // test.only('handle observer', async () => {
    //     const email = "dibolsoni@gmail.com";
    //     const password = "123321";
    //     store.dispatch(signIn(email, password))
    //     let state = await getState();
    //     expect(state.error.code).toBeUndefined();
    //     expect(state.user.email).toStrictEqual(email)

    //     store.dispatch(observer());
    //     state = await getState();
    //     expect(state.user.email).toStrictEqual(email);


    // })
})