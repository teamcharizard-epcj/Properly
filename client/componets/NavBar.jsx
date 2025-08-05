import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <div className='navbar'>
      <img className='logo' src='client/assets/properlyLogoH.svg' />
      <div id='views'>
        <a>Task View</a>
        <a>Property View</a>
      </div>
    </div>
  );
}
