import '../style.css';
import React from "react";
import { SignUp } from '../client/componets/SignUp'
import { Login } from '../client/componets/Login';
import { Routes, Route } from 'react-router-dom';
export function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
