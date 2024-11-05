import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmail } from '../../redux/actions/authActions'
import './General.css';
import Warnings from '../warnings/Warnings';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    // State variables for email confirmation
    const [isEmailSent, setIsEmailSent] = useState(false);

    // variables for errors
    const [errorMessage, setErrorMessage] = useState('');
    const [errorType, setErrorType] = useState('')


    const submitEmail = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/users/forgotPassword/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'email': email
                })
            })
            if (response.ok) {
                const data = await response.json()
                if (data.success) {
                    setIsEmailSent(true)
                    setErrorMessage('')
                }
                else {
                    setErrorMessage('Your Email is Incorrect')
                    setErrorType('error')
                }
            }
        }
        catch (err) {
            console.log('error while sending to backend', err)
        }
    }

    return <>
        {errorMessage && (
            <Warnings warningType="error" warningMessage={errorMessage} />
        )}
        <div className="main-Container"><div className="form-container">
            <p className="generalTitle">Forgot Password</p>
            <div className="form">
                <div className="input-group">
                    <label htmlFor="code">Enter Your Email</label>
                    <input
                        type="text"
                        name="code"
                        id="code"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <button className="sign" onClick={submitEmail}>
                    Send Verification Code
                </button>
            </div>

            <p className="signup">
                Remember your password?
                <a rel="noopener noreferrer" href="/login" className="">
                    Login
                </a>
            </p>
        </div>
        </div>

    </>
}
export default ForgotPassword;