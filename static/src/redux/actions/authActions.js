import { LOGIN_FAIL, LOGIN_SUCCESS, EMAIL_VERIFICATION_REQUIRED } from "./types";

const login = (email, password) => async dispatch => {
    try {
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

export default login