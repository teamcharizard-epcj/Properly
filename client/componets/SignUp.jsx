import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    (async () => {
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        });

        if (!response.ok) {
          alert('Error: Email already exists');
          navigate('/signup');
        } else {
          const { accessToken, refreshToken } = await response.json();
          sessionStorage.setItem('accessToken', accessToken);
          navigate('/main');
        }
      } catch (error) {
        console.log('Signup error: ', error);
      }
    })();
  }

 

  return (
    <div className="loginSignUp">
      <img className="logo" src='client/assets/properlyLogoH.svg' />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input id="name" name="name" type="text" onChange={handleChange}></input>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" onChange={handleChange}></input>
        <label htmlFor="password_hash">Password</label>
        <input id="password_hash" name="password_hash" type="password" onChange={handleChange}></input>
        {/* <Link to="/main"> */}
        <input type="submit" value="Sign Up"></input>
        {/* </Link> */}
      </form>
    </div>
  );
}
