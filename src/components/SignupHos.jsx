import React from 'react'
import '../css/cred.css';
import { Link } from 'react-router-dom';

export default function SignupHos() {

	return (
		<div>
			<div className="background">
				<img id='sign_img' src='signup.jpeg'></img>
			</div>
			<form className='form_cred form_cred_s'>
				<h3 id='signuphere'>SignUp Here</h3>

				<label className='label_cred mod_lbl' for="username">Health Care Name</label>
				<input className='input_cred mod_inp' type="text" placeholder="Email or Phone" id="username" />

				<label className='label_cred mod_lbl' for="id">HealthCare ID</label>
				<input className='input_cred mod_inp' type="text" placeholder="DD/MM/YYYY" id="username" />

				<label className='label_cred mod_lbl' for="email">E-Mail</label>
				<input className='input_cred mod_inp' type="text" placeholder="Email" id="username" />

				<label className='label_cred mod_lbl ' for="password">Password</label>
				<input className='input_cred mod_inp' type="password" placeholder="***" id="password" />

				<button className='button_cred'>Sign Up</button>
				<Link to='/loginHos' >
					<button className='button_cred'>Have An Account? Log In</button>
				</Link>
			</form>
		</div>
	)
}