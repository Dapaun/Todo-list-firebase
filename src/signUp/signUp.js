import React from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const handleSubmit = async (e) =>{
  e.preventDefault();
  console.log(e.target.elements.email.value);
  const email = e.target.elements.email.value;
  const password = e.target.elements.password.value;
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email,password);
    console.log("HERE IS THE NEW USER ", user);
  } catch(error) {
    console.error(error);
  }
}

const SignUp = () => {
  return (
    <div className="formWrapper">
    <h2>Add your details here</h2>
    <form className="signInForm" onSubmit={handleSubmit}>
      <input placeholder="Enter Email Here" type="text" name="email"/>
      <input placeholder="Enter Password Here" type="password" name="password"/>
      <button className="signInFormButton" type="submit">
        Sign UP
      </button>
      <Link className="signUp-link" to='/login'>Go Back</Link>
    </form>
  </div>
  )
}

export default SignUp;