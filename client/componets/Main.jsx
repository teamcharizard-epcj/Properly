import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavBar } from './NavBar';
import DataView from './DataView';

export function Main() {
  return (
    <>
      <NavBar></NavBar>
      <DataView></DataView>
      
      
    </>
  );
}
