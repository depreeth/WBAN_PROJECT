import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/cred.css";

export default function SignupHos() {
  const [name, setname] = useState("");
  const [mspid, setmspid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    const apiUrl = "http://your-api-url.com/signup"; // Replace with your actual API endpoint

    try {
      const response = await axios.post(apiUrl, {
        name,
        mspid,
        email,
        password,
      });

      console.log("Signup successful:", response.data);
    //   navigate('/home');
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <div className="background">
        <img id="sign_img" src="signup.jpeg" alt="Health Care Signup" />
      </div>
      <form className="form_cred form_cred_s" onSubmit={handleSubmit}>
        <h3 id="signuphere">SignUp Here</h3>

        <label className="label_cred mod_lbl" htmlFor="name">
          Health Care Name
        </label>
        <input
          className="input_cred mod_inp"
          type="text"
          placeholder="Enter Health Care Name"
          id="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <label className="label_cred mod_lbl" htmlFor="mspid">
          HealthCare ID
        </label>
        <input
          className="input_cred mod_inp"
          type="text"
          placeholder="Enter Health Care ID"
          id="mspid"
          value={mspid}
          onChange={(e) => setmspid(e.target.value)}
        />

        <label className="label_cred mod_lbl" htmlFor="email">
          E-Mail
        </label>
        <input
          className="input_cred mod_inp"
          type="email"
          placeholder="Enter Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label_cred mod_lbl" htmlFor="password">
          Password
        </label>
        <input
          className="input_cred mod_inp"
          type="password"
          placeholder="Enter Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="button_cred">
          Sign Up
        </button>
        <Link to="/loginHos">
          <button type="button" className="button_cred">
            Have An Account? Log In
          </button>
        </Link>
      </form>
    </div>
  );
}
