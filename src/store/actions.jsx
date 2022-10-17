import {
    SET_SHOW_LOGIN_MODAL,
    SET_IS_LOGIN_MODAL,
    SET_SHOW_CREATE_POST_MODAL,
    SET_POSTS,
    SET_CATEGORIES,
    SET_FILTER,
    SET_ROLES,
} from './constants';

export const setShowLoginModal = (payload) => ({
    type: SET_SHOW_LOGIN_MODAL,
    payload,
});

export const setIsLoginModal = (payload) => ({
    type: SET_IS_LOGIN_MODAL,
    payload,
});

export const setShowCreatePostModal = (payload) => ({
    type: SET_SHOW_CREATE_POST_MODAL,
    payload,
});

export const setPosts = (payload) => ({
    type: SET_POSTS,
    payload,
});

export const setCategories = (payload) => ({
    type: SET_CATEGORIES,
    payload,
});

export const setFilter = (payload) => ({
    type: SET_FILTER,
    payload,
});

export const setRoles = (payload) => ({
    type: SET_ROLES,
    payload,
});
