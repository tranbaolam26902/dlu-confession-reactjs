import { SET_TOKEN, SET_SHOW_LOGIN, SET_IS_LOGIN_MODAL } from './constants';

export const setToken = payload => ({
    type: SET_TOKEN,
    payload
});

export const setShowLogin = payload => ({
    type: SET_SHOW_LOGIN,
    payload
});

export const setIsLoginModal = payload => ({
    type: SET_IS_LOGIN_MODAL,
    payload
});