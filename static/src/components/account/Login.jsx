import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./General.css";
import ConfirmEmail from './ConfirmEmail';
import login from '../../redux/actions/authActions';
import Warnings from '../warnings/Warnings';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [displayWarning, setDisplayWarning] = useState([false, ""]);

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { emailVerificationRequired, isAuthenticated, error } = auth;

    const handleLogin = () => {
        dispatch(login(email, password));
    };

    // Use useEffect to handle side effects and prevent infinite render
    useEffect(() => {
        if (isAuthenticated) {
            console.log('is authed', isAuthenticated);
            setDisplayWarning([false, ""])
            window.location.href = '/';
        } else if (emailVerificationRequired) {
            console.log('sent email');
        } else if (error) {
            setDisplayWarning([true, error]);
        }
    }, [isAuthenticated, emailVerificationRequired, error]);

    return (
        <>
            {displayWarning[0] && <Warnings warningType="Error" warningMessage={displayWarning[1]} />}
            <div className="main-Container">
                {!emailVerificationRequired ? (
                    <div className="form-container">
                        <p className="generalTitle">Login</p>
                        <div className="form">
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder=""
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder=""
                                />
                                <div className="forgot">
                                    <a rel="noopener noreferrer" href="/forgot-password">Forgot Password?</a>
                                </div>
                            </div>
                            <button className="sign" onClick={handleLogin}>Sign in</button>
                        </div>
                        <p className="signup">
                            Don't have an account? <a rel="noopener noreferrer" href="/signup">Sign up</a>
                        </p>
                    </div>
                ) : (
                    <ConfirmEmail email={email} password={password} />
                )}
            </div>
        </>
    );
};

export default Login;
