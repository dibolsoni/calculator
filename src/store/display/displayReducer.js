import {
    RESET_VALUE,
    REMOVE_LAST_DIGIT,
    RESET_DIGITS,
    NEW_VALUE,
    ADD_DIGIT
} from './actionTypes';


export const initialState = {
    display: 0,
    digits: [],
};

const displayReducer = (state = initialState, action) => {
    switch(action.type){
        //actions without payload
        case RESET_VALUE:
            return {...state, display: 0};
        case REMOVE_LAST_DIGIT:
            const {digits} = state;
            if (digits.length > 0) 
                return {...state, digits: digits.slice(0, digits.length - 1)};
            return state;
        case RESET_DIGITS:
            return {...state, digits: []};

        //actions with payload
        case NEW_VALUE:
            return {...state, display: action.payload};
        case ADD_DIGIT:
            const numbers = new RegExp(/^[0-9]$/);
            if (!numbers.test(action.payload)) return state;
            return {...state, digits: [...state.digits, action.payload]};
        default:
            return state;
    };
};

export default displayReducer;