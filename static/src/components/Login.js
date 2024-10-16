import React, { useState } from 'react';
import "./Login.css";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); 
        }); 
    });
    return (
        <div className='main-Container'>

            <div className="form-container">
                <p className="title">Login</p>
                <div className="form">
                    <div className="input-group">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" placeholder=""></input>
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder=""></input>
                        <div class="forgot">
                            <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
                        </div>
                    </div>
                    <button class="sign">Sign in</button>
                </div>

                <p class="signup">Don't have an account?
                    <a rel="noopener noreferrer" href="/signup" class="">Sign up</a>
                </p>
            </div>
        </div>
    );

}

export default Login;
