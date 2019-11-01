import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER,
        LIKE_SCREAM, UNLIKE_SCREAM 
    } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    userCredentials: {},
    likes: [],
    notifications: []
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true 
            }
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.userCredentials.handle,
                        screamId: action.payload.id
                    }
                ]
            }
        case UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.screamId !== action.payload.id
                )
            }
        default:
            return state;
    }
}