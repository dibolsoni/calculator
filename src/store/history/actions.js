import {
    GET_HISTORY_STATE,
    HISTORY_ADD_STATE,
    HISTORY_REMOVE_STATE,
    HISTORY_SET_STATE_TO_FIRST
} from './actionsType';


export const getHistoryState = (state_index = null) => ({
    type: GET_HISTORY_STATE,
    payload: state_index
})

export const historyAddState = (state) => ({
    type: HISTORY_ADD_STATE,
    payload: state
})

export const historyRemoveState = (state_index = null) => ({
    type: HISTORY_REMOVE_STATE,
    payload: state_index
})

export const historySetStateToFirst = (state_index) => ({
    type: HISTORY_SET_STATE_TO_FIRST,
    payload: state_index
})