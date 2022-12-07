import {
    SET_SHOW_SIGN_IN_MODAL,
    SET_SHOW_SIGN_UP_MODAL,
    SET_SHOW_FORGOT_PASSWORD_MODAL,
    SET_SHOW_CHANGE_PASSWORD_MODAL,
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
    SET_SHOW_REPORT_MODAL,
    SET_SHOW_EDIT_ROLES_MODAL,
    SET_ACCOUNT_DATA,
} from './constants';

const apiURL = 'https://localhost:44332';

const initStates = {
    apiURL: apiURL,
    imageURL: `${apiURL}/image/post?id=`,
    avatarURL: `${apiURL}/image/user?id=`,
    showSignInModal: false,
    showSignUpModal: false,
    showForgotPasswordModal: false,
    showChangePasswordModal: false,
    showCreatePostModal: false,
    posts: [],
    categories: [],
    filter: '',
    roles: [],
    userId: '',
    userAvatar: '',
    postData: {},
    showPostModal: false,
    scrollToComment: false,
    editPostData: {},
    message: '',
    showMessageModal: false,
    notifications: [],
    showReportModal: false,
    showEditRolesModal: false,
    accountData: {},
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SHOW_SIGN_IN_MODAL:
            return {
                ...state,
                showSignInModal: action.payload,
            };
        case SET_SHOW_SIGN_UP_MODAL:
            return {
                ...state,
                showSignUpModal: action.payload,
            };
        case SET_SHOW_FORGOT_PASSWORD_MODAL:
            return {
                ...state,
                showForgotPasswordModal: action.payload,
            };
        case SET_SHOW_CHANGE_PASSWORD_MODAL:
            return {
                ...state,
                showChangePasswordModal: action.payload,
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
        case SET_POST_DATA:
            return {
                ...state,
                postData: action.payload,
            };
        case SET_SHOW_POST_MODAL:
            return {
                ...state,
                showPostModal: action.payload,
            };
        case SET_SCROLL_TO_COMMENT:
            return {
                ...state,
                scrollToComment: action.payload,
            };
        case SET_EDIT_POST_DATA:
            return {
                ...state,
                editPostData: action.payload,
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
            };
        case SET_SHOW_MESSAGE_MODAL:
            return {
                ...state,
                showMessageModal: action.payload,
            };
        case SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload,
            };
        case SET_SHOW_REPORT_MODAL:
            return {
                ...state,
                showReportModal: action.payload,
            };
        case SET_SHOW_EDIT_ROLES_MODAL:
            return {
                ...state,
                showEditRolesModal: action.payload,
            };
        case SET_ACCOUNT_DATA:
            return {
                ...state,
                accountData: action.payload,
            };
        default:
            throw new Error('Error');
    }
}

export { initStates };
export default reducer;
