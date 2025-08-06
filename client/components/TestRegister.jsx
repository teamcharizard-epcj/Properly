import React from 'react';

export default function TestRegister() {
  async function register() {
    try {
      const response = await fetch(
        'http://localhost:3000/authRoutes/register',
        {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            username: 'bob',
            email: 'bob@example.com',
            password: '12345',
          },
        }
      );
    } catch (error) {
      console.log('This is the register button error : ', error);
    }
  }

  return <button onClick={register}>Register</button>;
}
