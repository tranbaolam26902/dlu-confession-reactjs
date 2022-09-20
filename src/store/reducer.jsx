import { SET_TOKEN, SET_SHOW_LOGIN, SET_IS_LOGIN_MODAL } from './constants';

const initStates = {
    token: '',
    showLogin: false,
    isLoginModal: false
}

function reducer(state, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case SET_SHOW_LOGIN:
            return {
                ...state,
                showLogin: action.payload
            }
        case SET_IS_LOGIN_MODAL:
            return {
                ...state,
                isLoginModal: action.payload
            }
        default:
            throw new Error('Error');
    }
}

export { initStates }
export default reducer;