import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {confirmEmail} from '../../redux/actions/authActions'
import './General.css';

const ConfirmEmail = ({ email, password }) => {
    const [code, setCode] = useState('');

    const dispatch = useDispatch();
    const { isAuthenticated, error } = useSelector(state => state.auth);

    const submitCode = () => {
        dispatch(confirmEmail(email, password, code));
    };
    if (isAuthenticated) {
        console.log('authed')
        window.location.href='/'
    }

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