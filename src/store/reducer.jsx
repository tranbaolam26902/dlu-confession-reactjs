import {
    SET_SHOW_LOGIN_MODAL,
    SET_IS_LOGIN_MODAL,
    SET_SHOW_CREATE_POST_MODAL,
    SET_POSTS,
    SET_CATEGORIES,
    SET_FILTER,
    SET_ROLES,
    SET_USER_ID,
    SET_USER_AVATAR,
} from './constants';

const initStates = {
    apiURL: 'https://localhost:44332',
    showLoginModal: false,
    isLoginModal: true,
    showCreatePostModal: false,
    posts: [],
    categories: [],
    filter: '',
    roles: [],
    userId: '',
    userAvatar: '',
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SHOW_LOGIN_MODAL:
            return {
                ...state,
                showLoginModal: action.payload,
            };
        case SET_IS_LOGIN_MODAL:
            return {
                ...state,
                isLoginModal: action.payload,
            };
        case SET_SHOW_CREATE_POST_MODAL:
            return {
                ...state,
                showCreatePostModal: action.payload,
            };
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        case SET_FILTER:
            return {
                ...state,
                filter: action.payload,
            };
        case SET_ROLES:
            return {
                ...state,
                roles: action.payload,
            };
        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload,
            };
        case SET_USER_AVATAR:
            return {
                ...state,
                userAvatar: action.payload,
            };
        default:
            throw new Error('Error');
    }
}

export { initStates };
export default reducer;
