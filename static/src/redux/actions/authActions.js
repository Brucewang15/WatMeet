import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    EMAIL_VERIFICATION_REQUIRED,
    EMAIL_VERIFICATION_FAIL,
    EMAIL_VERIFICATION_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from "./types";

export const logout = () => async dispatch => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        console.log(refreshToken, 'refreshToken')

        const response = await fetch('http://127.0.0.1:8000/users/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            }),
        });

        if (response.ok) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            dispatch({
                type: LOGOUT_SUCCESS,
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL,
            });
        }
    } catch (error) {
        console.error('Logout error:', error);
        dispatch({
            type: LOGOUT_FAIL,
        });
    }
};

export const confirmEmail = (email, password, code) => async dispatch => {
    try {
        const response = await fetch(
            'http://127.0.0.1:8000/users/verify-email/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    veriCode: code,
                    email: email,
                }),
            }
        );
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                console.log('Email verified successfully');
                const tokenResponse = await fetch('http://127.0.0.1:8000/api/token/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: email,
                        password: password,
                    }),
                });
                if (tokenResponse.ok) {
                    const tokenData = await tokenResponse.json();
                    console.log('JWT Token:', tokenData);
                    localStorage.setItem('access_token', tokenData.access);
                    localStorage.setItem('refresh_token', tokenData.refresh);
                    dispatch({
                        type: EMAIL_VERIFICATION_SUCCESS,
                        payload: {
                            access: tokenData.access,
                            refresh: tokenData.refresh
                        }
                    })
                }
            } else {
                console.log('Failed to obtain JWT token');
            }
        }
        else {
            console.log('Invalid verification code');
            dispatch({
                type: EMAIL_VERIFICATION_FAIL
            })
        }

    }
    catch (err) {
        console.log('error', err)
        dispatch({
            type: EMAIL_VERIFICATION_FAIL,
            payload: 'An error occurred. Please try again.',
        });
    }
}

export const loadUser = () => dispatch => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken) {
        console.log(accessToken, refreshToken)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                accessToken,
                refreshToken,
            },
        });
    } else {
        dispatch({ type: LOGIN_FAIL });
    }
};
export const login = (email, password) => async dispatch => {
    try {
        console.log('in login')
        const response = await fetch('http://127.0.0.1:8000/users/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),  // Send credentials in the body
        });
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                console.log('email password correct')
                const tokenResponse = await fetch('http://127.0.0.1:8000/api/token/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: email,
                        password: password
                    }),
                });
                if (tokenResponse.ok) {
                    const tokenData = await tokenResponse.json();
                    console.log('JWT Token:', tokenData);
                    localStorage.setItem('access_token', tokenData.access);
                    localStorage.setItem('refresh_token', tokenData.refresh);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: {
                            access: tokenData.access,
                            refresh: tokenData.refresh
                        }
                    })
                }
                else {
                    console.log('Failed to obtain JWT token');
                }
            }
            else if (data.reason === 'Verify email') {
                dispatch({ type: EMAIL_VERIFICATION_REQUIRED });
            } else {
                dispatch({ type: LOGIN_FAIL, payload: data.reason });
            }

        }
    }
    catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: 'An error occurred. Please try again.',
        });
    }
}
