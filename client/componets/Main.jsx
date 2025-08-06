import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { NavBar } from './NavBar';
import PropertyView from './PropertyView';
import TaskView from './TaskView';

export function Main() {
  const [view, setView] = useState('Property');

  function handleChange() {
    if (view === 'Property') {
      setView('Task');
    }
    if (view === 'Task') {
      setView('Property');
    }
  }

  return (
    <>
      <NavBar changeView={handleChange} />
      {view === 'Property' && <PropertyView />}
      {view === 'Task' && <TaskView />}
    </>
  );
}
