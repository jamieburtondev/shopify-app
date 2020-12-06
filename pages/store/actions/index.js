import { ADD_TO_PICKUP, REMOVE_FROM_PICKUP } from './types';

export const addToPickup = action => {
    return {
        type: ADD_TO_PICKUP,
        id: action.id
    }
}

export const removeFromPickup = action => {
    return {
        type: REMOVE_FROM_PICKUP,
        id: action.id
    }
}