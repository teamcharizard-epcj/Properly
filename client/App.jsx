import '../style.css';
import React from "react";
import { SignUp } from '../client/components/SignUp'
import { Login } from '../client/components/Login';
import { Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}
