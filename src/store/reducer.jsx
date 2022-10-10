import {
    SET_SHOW_LOGIN_MODAL,
    SET_IS_LOGIN_MODAL,
    SET_SHOW_CREATE_POST_MODAL,
    SET_POSTS,
    SET_CATEGORIES,
    SET_FILTER,
} from './constants';

const initStates = {
    apiURL: 'https://localhost:44332',
    showLoginModal: false,
    isLoginModal: true,
    showCreatePostModal: false,
    posts: [],
    categories: [],
    filter: '',
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
        default:
            throw new Error('Error');
    }
}

export { initStates };
export default reducer;
