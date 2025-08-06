import React from 'react';

export default function TaskModal({ task, isOpen, onClose }) {
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
        <h2>{task.name}</h2>
        <h3>{task.status}</h3>
      <form>
        <label for="notes">Notes</label>
        <textarea id="Notes"></textarea>
      </form>
      <button>Save</button>
      <button>Delete Task</button>
      </div>
    </div>
  );
}
