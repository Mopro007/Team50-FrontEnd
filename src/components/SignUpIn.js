import React, { useEffect,useRef } from "react";
import './index.css';
import './components.css';

const SignUpIn = ( {SignUp, SignIn} ) => {
  const signUpFormRef = useRef();
  const signInFormRef = useRef();
  
  const switchForm = () => {
    if (signUpFormRef.current.style.display === "none") {
      signUpFormRef.current.style.display = "flex";
      signInFormRef.current.style.display = "none";
    } else {
      signUpFormRef.current.style.display = "none";
      signInFormRef.current.style.display = "flex";
    }
  };
  
  const handleFormSubmit = (event, isSignUp) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value
    };
    if (isSignUp) {
      SignUp(formData);
    } else {
      SignIn(formData);
    }
  };

  return (
    <div className="signupin container">
      <div ref={signUpFormRef} className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={(event) => handleFormSubmit(event, true)}>
          <input type="text" placeholder="Name" name="name" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <input type="submit" value="Submit" />
        </form>
        <h3>or</h3>
        <button onClick={switchForm}>Switch to Sign In</button>
      </div>
      <div ref={signInFormRef} className="signin" style={{ display: "none" }}>
        <h2>Sign In</h2>
        <form onSubmit={(event) => handleFormSubmit(event, false)}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <input type="submit" value="Submit" />
        </form>
        <h3>or</h3>
        <button onClick={switchForm}>Switch to Sign Up</button>
      </div>
    </div>
  );
};

export default SignUpIn;