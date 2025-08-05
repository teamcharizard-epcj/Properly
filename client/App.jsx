import '../style.css';
import React from "react";
import { SignUp } from '../client/componets/SignUp'
import { Login } from '../client/componets/Login';
import { Routes, Route } from 'react-router-dom';
import { Main } from './componets/Main';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}
