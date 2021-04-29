import {
    REDO,
    UNDO,
    RESET
} from './actionsType';

export const undo = () => ({
    type: UNDO
})

export const redo = () => ({
    type: REDO
})

export const reset = () => ({
    type: RESET
})