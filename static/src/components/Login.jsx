import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./General.css";
import ConfirmEmail from './ConfirmEmail';
import login from '../redux/actions/authActions'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailSent, setIsEmailSent] = useState(false)

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        });
    });

    // const handleLogin = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/users/login/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: email,
    //                 password: password
    //             })
    //         })
    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log(data)
    //             if (data.success) {
    //                 console.log('ok')
    //                 const tokenResponse = await fetch('http://127.0.0.1:8000/api/token/', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({
    //                         username: email,
    //                         password: password
    //                     }),
    //                 });
    //                 if (tokenResponse.ok) {
    //                     const tokenData = await tokenResponse.json();
    //                     console.log('JWT Token:', tokenData);

    //                     // Store tokens securely
    //                     localStorage.setItem('access_token', tokenData.access);
    //                     localStorage.setItem('refresh_token', tokenData.refresh);

    //                     // Redirect to the dashboard or protected route
    //                     window.location.href = '/';
    //                 } else {
    //                     console.log('Failed to obtain JWT token');
    //                 }
    //             }
    //             else if (data.reason == 'Verify email') {
    //                 setIsEmailSent(true)
    //                 console.log('email is sent')
    //             }
    //             else {
    //                 console.log(data.reason)
    //             }
    //         }
    //     }
    //     catch (err) {
    //         console.log('error', err)
    //     }
    // }
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { emailVerificationRequired, isAuthenticated, error } = auth;
    const handleLogin = () => {
        dispatch(login(email, password))
    }
    if (isAuthenticated ) {
        console.log('is authed')
    }
    if (emailVerificationRequired) {
        console.log('sent email')
    }
    return (
        <div className='main-Container'>
            {!isEmailSent ? (
                <div className="form-container">
                    <p className="title">Login</p>
                    <div className="form">
                        <div className="input-group">
                            <label for="email">Email</label>
                            <input type="text" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} placeholder=""></input>
                        </div>
                        <div class="input-group">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder=""></input>
                            <div class="forgot">
                                <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                            </div>
                        </div>
                        <button class="sign" onClick={handleLogin}>Sign in</button>
                    </div>

                    <p class="signup">Don't have an account?
                        <a rel="noopener noreferrer" href="/signup" class="">Sign up</a>
                    </p>
                </div>
            ) : (<ConfirmEmail email={email} password={password} />)}
        </div>
    );

}

export default Login;
