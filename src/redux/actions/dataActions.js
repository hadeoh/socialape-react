import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, 
    UNLIKE_SCREAM, DELETE_SCREAM, LOADING_UI,
    POST_SCREAM, SET_ERRORS, CLEAR_ERRORS, SET_SCREAM, STOP_LOADING_UI,
    SUBMIT_COMMENT
 } from '../types'
import axios from 'axios';

// Get all screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.data.foundScreams
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
        })
}

// Get a scream
export const getScream = (id) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios.get(`/screams/${id}`)
        .then((res) => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data.data
            });
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => console.log(err))
}

// Post a scream
export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/screams', newScream)
        .then(res => {
            dispatch({
                type: POST_SCREAM,
                payload: res.data.data.scream
            });
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

// Like a scream
export const likeScream = (screamId) => dispatch => {
        axios.get(`/screams/${screamId}/like`)
             .then(res => {
                 dispatch({
                     type: LIKE_SCREAM,
                     payload: res.data.data.newFoundScream
                 })
             })
             .catch(err => console.log(err));
}

// Unlike a scream
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/screams/${screamId}/unlike`)
         .then(res => {
             dispatch({
                 type: UNLIKE_SCREAM,
                 payload: res.data.data.newFoundScream
             })
         })
         .catch(err => console.log(err));
}

// Submit a comment
export const submitComment = (screamId, commentData) => (dispatch) => {
    axios.post(`scream/${screamId}/comment`, commentData)
        .then(res => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: res.data.data.screamComment
            });
            dispatch(clearErrors())
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

// Delete a scream
export const deleteScream = (id) => (dispatch) => {
    axios.delete(`/screams/${id}`)
        .then(() => {
            dispatch({
                type: DELETE_SCREAM,
                payload: id
            })
        })
        .catch(err => console.log(err))
}

export const getUserData = (userHandle) => (dispatch) =>{
    dispatch({ type: LOADING_DATA });
    axios.get(`/auth/user/details/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.data.screams
            })
        })
        .catch(() => {
            dispatch({
                type: SET_SCREAMS,
                payload: null
            })
        })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}