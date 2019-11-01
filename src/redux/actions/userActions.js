import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type:LOADING_UI });
    axios.post('/auth/login', userData)
            .then(res => {
                setAuthorizationHeader(res.data.data.token)
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                history.push('/')
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type:LOADING_UI });
    axios.post('/auth/signup', newUserData)
            .then(res => {
                setAuthorizationHeader(res.data.data.token)
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                history.push('/')
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.get('/auth/user/details')
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data.data
        })
    })
    .catch(err => console.log(err));
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.put('/auth/user/image', formData)
    .then(() => {
        dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.put('/auth/user/details', userDetails)
    .then(() => {
        dispatch(getUserData());
    })
    .catch(err => console.log(err))
}

const setAuthorizationHeader = (token) => {
    localStorage.setItem('token', `Bearer ${token}`);
    axios.defaults.headers.common['Authorization'] = (`Bearer ${token}`);
}