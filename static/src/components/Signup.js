import React, { useState } from 'react';
import "./Login.css";

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); 
        }); 
    });
    return (
        <div>
            <div className="form-container">
                <p className="title">Sign Up</p>
                <div className="form">
                    <div className="input-group">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" placeholder=""></input>
                    </div>
                
                    <div className="input-group">
                        <label for="username">Email</label>
                        <input type="text" name="username" id="username" placeholder=""></input>
                    </div>

                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder=""></input>
                    </div>

                    <div className="input-group">
                        <label for="username">Re-enter Password</label>
                        <input type="text" name="username" id="username" placeholder=""></input>
                    </div>
                    <button class="sign" onClick>Sign Up</button>
                </div>

                <p class="signup">Have an account?
                    <a rel="noopener noreferrer" href="/login" class="">Sign up</a>
                </p>
            </div>


        </div>
    );

}

export default Signup;
