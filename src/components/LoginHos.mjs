import React from 'react'
import { Link } from 'react-router-dom';

export default function LoginHos() {
    return (
        <div>
            <div className="background">
                {/* <div className="shape"></div>
        <div className="shape"></div> */}
                <img id='login_img' src='login.jpeg' />
            </div>
            <form className='form_cred'>
                <h3>Login Here</h3>

                <label className='label_cred' for="username">Health Care ID</label>
                <input className='input_cred' type="text" placeholder="Email or Phone" id="username" />

                <label className='label_cred' for="password">Password</label>
                <input className='input_cred' type="password" placeholder="****" id="password" />

                <button className='button_cred'>Log In</button>
                <Link to='/signupHos'>
                    <button className='button_cred'>Dont Have Account? Sign Up</button>
                </Link>

                {/* <div className="social">
          <div className="go"><i className="fab fa-google"></i> Google</div>
          <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
        </div> */}
            </form>
        </div>
    )
}