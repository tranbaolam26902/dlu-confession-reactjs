import {
    SET_SHOW_LOGIN_MODAL,
    SET_IS_LOGIN_MODAL,
    SET_SHOW_CREATE_POST_MODAL,
    SET_POSTS,
    SET_CATEGORIES,
    SET_ROLES,
    SET_USER_ID,
    SET_USER_AVATAR,
    SET_POST_DATA,
    SET_SHOW_POST_MODAL,
    SET_SCROLL_TO_COMMENT,
    SET_EDIT_POST_DATA,
    SET_MESSAGE,
    SET_SHOW_MESSAGE_MODAL,
    SET_NOTIFICATIONS,
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

export const setRoles = (payload) => ({
    type: SET_ROLES,
    payload,
});

export const setUserId = (payload) => ({
    type: SET_USER_ID,
    payload,
});

export const setUserAvatar = (payload) => ({
    type: SET_USER_AVATAR,
    payload,
});

export const setPostData = (payload) => ({
    type: SET_POST_DATA,
    payload,
});

export const setShowPostModal = (payload) => ({
    type: SET_SHOW_POST_MODAL,
    payload,
});

export const setScrollToComment = (payload) => ({
    type: SET_SCROLL_TO_COMMENT,
    payload,
});

export const setEditPostData = (payload) => ({
    type: SET_EDIT_POST_DATA,
    payload,
});

export const setMessage = (payload) => ({
    type: SET_MESSAGE,
    payload,
});

export const setShowMessageModal = (payload) => ({
    type: SET_SHOW_MESSAGE_MODAL,
    payload,
});

export const setNotifications = (payload) => ({
    type: SET_NOTIFICATIONS,
    payload,
});
