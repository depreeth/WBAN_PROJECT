import React from 'react'
import '../css/cred.css';
import { Link,useNavigate } from 'react-router-dom';

export default function Signup() {

	// function openPopup() {
	//     var popupContainer = document.getElementById("popup-container");
	//     popupContainer.style.display = "block";
	// }

	// function closePopup() {
	//     var popupContainer = document.getElementById("popup-container");
	//     popupContainer.style.display = "none";
	// }
	const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
      navigate('/home');
  };

	return (
		<div>
			<div className="background">
				<img id='sign_img' src='signup.jpeg'></img>
				{/* <div className="shape"></div>
                <div className="shape"></div> */}
			</div>
			<form onSubmit={handleSubmit} className='form_cred form_cred_s'>
				<h3 id='signuphere'>SignUp Here</h3>

				<label className='label_cred mod_lbl' for="username">Username</label>
				<input className='input_cred mod_inp' type="text" placeholder="Email or Phone" id="username" />

				<label className='label_cred mod_lbl' for="username">Date Of Birth</label>
				<input className='input_cred mod_inp' type="text" placeholder="DD/MM/YYYY" id="username" />

				<label className='label_cred mod_lbl' for="username">Mail/Phone</label>
				<input className='input_cred mod_inp' type="text" placeholder="Email or Phone" id="username" />

				<label className='label_cred mod_lbl ' for="password">Password</label>
				<input className='input_cred mod_inp' type="password" placeholder="***" id="password" />

				<button className='button_cred'>Sign Up</button>
				<Link to='/login' >
				<button className='button_cred'>Have An Account? Log In</button>
				</Link>
			</form>
		</div>
	)
}