import React from 'react'
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
      navigate('/home');
  };

  return (
    <div>
      <div className="background">
        <img id='login_img' src='login.jpeg' />
      </div>
      <form onSubmit={handleSubmit} className='form_cred'>
        <h3>Login Here</h3>

        <label className='label_cred' for="username">Username</label>
        <input className='input_cred' type="text" placeholder="Email or Phone" id="username" />

        <label className='label_cred' for="password">Password</label>
        <input className='input_cred' type="password" placeholder="****" id="password" />

        <button className='button_cred'>Log In</button>
        <Link to='/signup'>
        <button className='button_cred'>Dont Have Account? Sign Up</button>
        </Link>
      </form>
    </div>
  )
}