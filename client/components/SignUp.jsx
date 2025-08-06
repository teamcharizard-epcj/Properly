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
        const response = await fetch('http://localhost:3000/authRoutes/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
          credentials: 'include' //matches backend
        });

        if (!response.ok) {
          alert('Error: Email already exists');
          navigate('/signup');
        } else {
          const data = await response.json();
          console.log('Signed up successfully', data.user);
          navigate('/main');
          // const { accessToken, refreshToken } = await response.json();
          // sessionStorage.setItem('accessToken', accessToken);
          // navigate('/main');
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
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" onChange={handleChange}></input>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" onChange={handleChange}></input>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={handleChange}></input>
        {/* <Link to="/main"> */}
        <input type="submit" value="Sign Up"></input>
        {/* </Link> */}
      </form>
    </div>
  );
}
