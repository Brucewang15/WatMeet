import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, EMAIL_VERIFICATION_REQUIRED } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    loading: true,
    error: null,
};

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                accessToken: payload.access,
                refreshToken: payload.refresh,
                loading: false,
                error: null,
            };
        case EMAIL_VERIFICATION_REQUIRED:
            return {
                ...state,
                emailVerificationRequired: true,
                isAuthenticated: false,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
                error: payload,
            };
        default:
            return state;
    }
}