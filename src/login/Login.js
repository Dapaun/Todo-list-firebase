import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { signInWithGoogle, auth } from "../firebase";

import './login.css';

const Login = ({logged}) => {
  let history = useHistory();

  useEffect( () => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        history.push("/itemlist");
      }
    });
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;  
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  const googleLogin = (e) => {
    e.preventDefault();
    signInWithGoogle();
  }

  return (
  <div className="formWrapper">
    <h1>Welcome to my firebase todo list</h1>
    <h2>Sign in with email ?</h2>
    <form className="signInForm" onSubmit={handleSubmit}>
      <input placeholder="Enter Email Here" type="text" name="email"/>
      <input placeholder="Enter Password Here" type="password" name="password"/>
      <button className="signInFormButton" type="submit">
        Sign In 
      </button>
      <Link className="signUp-link" to='/signUp'>Sign UP?</Link>
    </form>
    {(!logged) && (
      <div>
        <h2>Sign In with Google?</h2>
        <button className="signInFormButton" onClick={googleLogin}>
          Google Sign IN
        </button>
      </div>
    ) }
  </div>
  )
}

export default Login;