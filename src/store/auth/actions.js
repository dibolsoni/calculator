import { OBSERVER, RESET_STATE, SIGN_IN, SIGN_IN_COMPLETED, SIGN_IN_FAILED, SIGN_IN_REQUESTED, SIGN_OUT } from "./actionTypes";

export const signIn = (email, password) => ({
    type: SIGN_IN,
    payload: { email, password }
})
export const signInRequested = (email, password) => ({
    type: SIGN_IN_REQUESTED,
    payload: { email, password }
})
export const signInCompleted = (user) => ({
    type: SIGN_IN_COMPLETED,
    payload: user
})
export const signInFailed = (error) => ({
    type: SIGN_IN_FAILED,
    payload: {
        error
    }
})

export const signOut = () => ({
    type: SIGN_OUT
})


export const resetState = () => ({
    type: RESET_STATE
})

export const observer = () => ({
    type: OBSERVER
})

