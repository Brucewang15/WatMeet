import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

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
        case LOGIN_FAIL:
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                accessToken: null,
                refreshToken: null,
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
}