import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./General.css";
import ConfirmEmail from './ConfirmEmail';
import login from '../../redux/actions/authActions'

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

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { emailVerificationRequired, isAuthenticated, error } = auth;
    const handleLogin = () => {
        dispatch(login(email, password))
    }
    if (isAuthenticated) {
        console.log('is authed', isAuthenticated)
        window.location.href='/'
    }
    else if (emailVerificationRequired) {
        console.log('sent email')
    }
    else {
        console.log(error)
    }
    return (
        <div className='main-Container'>
            {!emailVerificationRequired ? (
                <div className="form-container">
                    <p className="generalTitle">Login</p>
                    <div className="form">
                        <div className="input-group">
                            <label for="email">Email</label>
                            <input type="text" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} placeholder=""></input>
                        </div>
                        <div class="input-group">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder=""></input>
                            <div class="forgot">
                                <a rel="noopener noreferrer" href="/forgot-password">Forgot Password ?</a>
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
