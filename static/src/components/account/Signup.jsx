import React, { useState } from 'react';
import './General.css';
import ConfirmEmail from './ConfirmEmail';
import Warning from '../warnings/Warnings'

const Signup = () => {
    // State variables for signup
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailTaken, setEmailTaken] = useState(false);
    const [warning, setWarning] = useState([false, "", ""])

    // State variables for email confirmation
    const [isEmailSent, setIsEmailSent] = useState(false);

    const checkPasswordStrong = (password) => {
        let symbol = false
        let number = false
        let letter = false
        for (let i = 0; i < password.length; i++) {
            const code = password[i].charCodeAt(0);
            if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
                letter = true
            } else if (code >= 48 && code <= 57) {
                number = true
            } else {
                symbol = true
            }
        }
        return symbol && number && letter
    }

    // Function to handle signup and send confirmation email
    const confirmEmail = async () => {
        if (
            email === '' ||
            firstName === '' ||
            lastName === '' ||
            password === '' ||
            confirmPassword === ''
        ) {
            alert('All fields are required');
            return;
        }
        else if (password.length < 8) {
            console.log('above 8')
            setWarning([true, "Error", "Your password length must be above 8"])
            return;
        }
        else if (!checkPasswordStrong(password)){
            console.log('1 letter number and symbol')
            setWarning([true, "Error", "Your Password should have at least 1 letter, number, and symbol"])
            return;
        }

        else if (password !== confirmPassword) {
            console.log('Passwords do not match');
            setWarning([true, "Error", "Your passwords do not match"])
            return;
        }
        else {
            setWarning([false, "", ""])
        }

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/users/confirmationEmail/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        username: email, // Assuming username is the email
                        firstName: firstName,
                        lastName: lastName,
                        password: password,
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setIsEmailSent(true); // Show the email confirmation form
                } else {
                    console.log(data.reason);
                    if (data.reason === 'email_taken') {
                        setEmailTaken(true);
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to sign up. Please try again.');
        }
    };

    return <>
        {warning[0] && <Warning warningType={warning[1]} warningMessage={warning[2]} />}
        <div className="main-Container">
            {!isEmailSent ? (
                // Signup Form
                <div className="form-container">
                    <p className="title">Sign Up</p>
                    {emailTaken && <p className="error">Email is already taken</p>}
                    <div className="form">
                        <div className="input-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmPassword">Re-enter Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                        </div>

                        <button className="sign" onClick={confirmEmail}>
                            Sign Up
                        </button>
                    </div>

                    <p className="signup">
                        Have an account?
                        <a rel="noopener noreferrer" href="/login" className="">
                            Login
                        </a>
                    </p>
                </div>
            ) : (
                // Email Confirmation Form
                <ConfirmEmail email={email} password={password} />
            )}
        </div>
    </>
};

export default Signup;
