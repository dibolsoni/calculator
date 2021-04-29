import { HISTORY_REMOVE_STATE, HISTORY_SET_STATE_TO_FIRST } from './actionsType';

const reducerWithHistory = (reducer, initState) => {
    const initialState = {
        past: [],
        present: reducer(initState, {}),
        future: []
    };

    return (state = initialState, action) => {
        const {past, present, future} = state;

        switch (action.type) {
            case HISTORY_REMOVE_STATE:
                const previous = past[past.length -1];
                const newPast = past.slice(0, past.length -1)
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                }
            case HISTORY_SET_STATE_TO_FIRST:
                const next = future[0];
                const newFuture = future.slice(1)
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                }
            default:
                const newPresent = reducer(present, action)
                if (present === newPresent)
                    return state;
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                }
        }

    }
}



export default reducerWithHistory;