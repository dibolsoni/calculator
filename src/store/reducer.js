import {NEW_VALUE, RESET_VALUE} from './actionTypes';

export const initialState = {
    display: 0
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case NEW_VALUE:
            return {...state, display: action.payload};
        case RESET_VALUE:
            return {...state, initialState};
        default:
            return state;
    };
};

export default reducer;