import React, { useState } from 'react';
import './Login.css';

const ConfirmEmail = () => {
    const [code, setCode] = useState('')

    
    const submitCode = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/users/verify-email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    veriCode: code,
                    email: localStorage.getItem('email'),
                })
            });
            if (response.ok) {
                response.json().then(data => {
                    if (data.success) {
                        console.log('ok code');
                    }
                    else {
                        console.log('not ok code')
                    }
                }
                )
            }
        }
        catch (error) {
            console.error('Error:', error);
        }

    }
    return (
        <div className='main-Container'>
            <div className="form-container">
                <p className="title">Check Your Email</p>
                <div className="form">
                    <div className="input-group">
                        <label htmlFor="username">Enter Your Code</label>
                        <input type="text" name="username" id="username" placeholder=""
                            onChange={(e) => { setCode(e.target.value) }} />
                    </div>
                    <button className="sign" onClick={submitCode}>Create your account</button>
                </div>

                <p className="signup">Didn't receive a code?
                    <a rel="noopener noreferrer" href="/signup" className="">Send another one</a>
                </p>
            </div>
        </div>

    );
}
export default ConfirmEmail;