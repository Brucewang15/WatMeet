import React, { useState } from 'react';
import './General.css';
import ConfirmEmail from './ConfirmEmail';

const Signup = () => {
    // State variables for signup
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailTaken, setEmailTaken] = useState(false);

    // State variables for email confirmation
    const [isEmailSent, setIsEmailSent] = useState(false);

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

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
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

    return (
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
    );
};

export default Signup;
