import { SET_SCREAMS, SET_SCREAM, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SUBMIT_COMMENT } from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.id === action.payload.id);
            state.screams[index] = action.payload;
            if(state.scream.id === action.payload.id) {
                state.scream = action.payload
            }
            return {
                ...state 
            }
        case DELETE_SCREAM:
            let newIndex = state.screams.findIndex(scream => scream.id === action.payload);
            state.screams.splice(newIndex, 1);
            return {
                ...state
            }
        case POST_SCREAM:
            return  {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case SET_SCREAM: 
            return {
                ...state,
                scream: action.payload
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }
        default:
            return state;
    }
}