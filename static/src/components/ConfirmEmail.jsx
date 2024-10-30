import React, { useState } from 'react';
import './General.css';

const ConfirmEmail = ( {email, password}) => {
    const [code, setCode] = useState('');

    // Function to handle email verification and obtain JWT token
    const submitCode = async () => {
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

                    // Request JWT token after successful email verification
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

                        // Store tokens securely
                        localStorage.setItem('access_token', tokenData.access);
                        localStorage.setItem('refresh_token', tokenData.refresh);

                        // Redirect to the dashboard or protected route
                        window.location.href = '/';
                    } else {
                        console.log('Failed to obtain JWT token');
                    }
                } else {
                    console.log('Invalid verification code');
                    alert('Invalid verification code. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <p className="title">Check Your Email</p>
            <div className="form">
                <div className="input-group">
                    <label htmlFor="code">Enter Your Code</label>
                    <input
                        type="text"
                        name="code"
                        id="code"
                        onChange={(e) => {
                            setCode(e.target.value);
                        }}
                    />
                </div>
                <button className="sign" onClick={submitCode}>
                    Confirm Your Account
                </button>
            </div>

            <p className="signup">
                Didn't receive a code?
                <a rel="noopener noreferrer" href="/signup" className="">
                    Send another one
                </a>
            </p>
        </div>
    );
}
export default ConfirmEmail;