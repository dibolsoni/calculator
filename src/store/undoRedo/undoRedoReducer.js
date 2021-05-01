import { REDO, UNDO, RESET } from './actionsType';

export const MAX_N_UNDO = 300;



const reducerWithUndoRedo = (reducer, initState) => {
    const initialState = {
        past: [],
        present: reducer(initState, {}),
        future: []
    };

    return (state = initialState, action) => {
        const {past, present, future} = state;

        switch (action.type) {
            case RESET:
                return initialState;
            case UNDO:
                if (past.length < 1)
                    return state;
                const previous = past[past.length -1];
                const newPast = past.slice(0, past.length -1);
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                }
            case REDO:
                if (future.length < 1)
                    return state;
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
                const limitedPast = past.length < MAX_N_UNDO ? past : past.slice(1);
                return {
                    past: [ ...limitedPast , present],
                    present: newPresent,
                    future: []
                }
        }

    }
}



export default reducerWithUndoRedo;