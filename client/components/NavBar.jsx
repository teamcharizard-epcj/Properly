import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';

export function NavBar({ changeView }) {
  
  return (
    <div className='navbar'>
      <img className='logo' src='client/assets/properlyLogoH.svg' />
      <div id='views'>
        {/* <a onClick={()=>{changeView()}} title="Task View">Task View</a>
        <a onClick={()=>{changeView()}} title="Property View">Property View</a> */}
        <a onClick={()=>{changeView()}}><ToggleSwitch/></a>
      </div>
    </div>
  );
}
