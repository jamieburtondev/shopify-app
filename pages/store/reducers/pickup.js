import { ADD_TO_PICKUP, REMOVE_FROM_PICKUP  } from '../actions/types';

const pickup = (state = [], action = {}) => {
    switch (action.type) {
        case ADD_TO_PICKUP: 
            return state.concat([action.id]);
        case REMOVE_FROM_PICKUP:
            const index = state.indexOf(action.id);
            return state.slice(0, index).concat(state.slice(index + 1));
        default:
            return state;
    }
}

export default pickup;