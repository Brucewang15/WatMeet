import React from'react';
import './Login.css';

const ConfirmEmail = () => {
    return(
        <div className='main-Container'>

            <div className="form-container">
                <p className="title">Check Your Email</p>
                <div className="form">
                    <div className="input-group">
                        <label for="username">Enter Your Code</label>
                        <input type="text" name="username" id="username" placeholder=""></input>
                    </div>
                    <button class="sign">Create your account</button>
                </div>

                <p class="signup">Didn't receive a code?
                    <a rel="noopener noreferrer" href="/signup" class=""> Send another one</a>
                </p>
            </div>
        </div>
    );
}
export default ConfirmEmail;