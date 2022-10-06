import { SET_SHOW_LOGIN_MODAL, SET_IS_LOGIN_MODAL, SET_SHOW_CREATE_POST_MODAL } from './constants';

const initStates = {
    apiURL: 'https://localhost:44332/',
    showLoginModal: false,
    isLoginModal: true,
    showCreatePostModal: false,
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
        default:
            throw new Error('Error');
    }
}

export { initStates };
export default reducer;
