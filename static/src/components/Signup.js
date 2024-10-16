import React, { useState } from 'react';
import "./Login.css";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [usernameTaken, setUsernameTaken] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        });
    });

    const confirmEmail = async () => {

        if (email === '' || username === '' || password === '' || confirmPassword === '') {
            alert('All fields are required');
            return false;
        }
        console.log(username, email, password, confirmPassword);
        try {
            const response = await fetch('http://127.0.0.1:8000/users/confirmationEmail/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': token,
                },
                //credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                }),
            })
            if (response.ok) {
                response.json().then(data => {  
                    if (data.success) {
                        localStorage.setItem('email', email)
                        window.location.href = `/confirmEmail`
                    }
                    else {
                        console.log(data.reason)
                        if (data.reason === 'username_taken') {
                            setUsernameTaken(true);
                        }
                        if (data.reason === 'email_taken') {
                            setEmailTaken(true);
                        }
                    }
                }
            )
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Failed to sign up. Please try again. 2');
        }
    }
    return (
        <div className='main-Container'>
            <div className="form-container">
                <p className="title">Sign Up</p>
                {usernameTaken && <p className="error">Username is already taken</p>}
                {emailTaken && <p className="error">Email is already taken</p>}
                <div className="form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" placeholder=""
                            onChange={(e) => { setUsername(e.target.value) }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" placeholder=""
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder=""
                            onChange={(e) => { setPassword(e.target.value) }} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">Re-enter Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder=""
                            onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    </div>

                    <button className="sign" onClick={confirmEmail}>Sign Up</button>
                </div>

                <p className="signup">Have an account?
                    <a rel="noopener noreferrer" href="/login" className="">Login</a>
                </p>
            </div>
        </div>

    );

}

export default Signup;
