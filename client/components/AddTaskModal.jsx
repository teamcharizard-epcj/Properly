import React from 'react';

export default function AddTaskModal({ task, isOpen, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !task) {
    return null;
  }

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content'>
        <form>
          <label for='task'>Task Name</label>
          <input type='text' id='task'></input>
          <label for='property'>Property Name</label>
          <input type='text' id='property'></input>
          <label for='notes'>Notes</label>
          <textarea id='Notes'></textarea>
        </form>
        <button>Save Task</button>
      </div>
    </div>
  );
}
