import {
    RESET_STATE,
    SIGN_IN_COMPLETED, SIGN_IN_FAILED, SIGN_IN_REQUESTED,  
} from './actionTypes';



export const STATUS = {
    idle: 'IDLE',
    requested: 'REQUESTED',
    connected: 'CONNECTED',
    rejected: 'REJECTED'
}

export const initialState = {
    STATUS: STATUS.idle,
    user: {
        email: undefined,
        password: undefined
    },
    error: {
        code: undefined,
        message: undefined
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_REQUESTED:
            return {
                ...state,
                STATUS: STATUS.requested
            }
        case SIGN_IN_FAILED:
            const {error} = action.payload;
            return {
                ...state,
                STATUS: STATUS.rejected,
                error: error ? error : {code: 'unhandled error', message: 'Unknown error'}
            }
        case SIGN_IN_COMPLETED:
            const user = action.payload;
            if (!user)
                return state;
            return {
                ...state,
                STATUS: STATUS.connected,
                user,
                error: initialState.error
            }
        case RESET_STATE:
            return initialState;

        // case OBSERVER:
        //     const observerResult = onStateChanged(user);
        //     return {
        //         ...state,
        //         user: observerResult.user ? observerResult.user : initialState.user,
        //         error: observerResult.error ? observerResult.error : initialState.error
        //     }
    
        default:
            return state;
    }
}

export default authReducer;