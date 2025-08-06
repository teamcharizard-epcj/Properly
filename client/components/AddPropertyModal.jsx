import React from 'react';

export default function AddPropertyModal({ task, isOpen, onClose }) {
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
          <label for='property'>Property Name</label>
          <input type='text' id='property'></input>
          <label for='address'>Address</label>
          <input type='text' id='address'></input>
        </form>
        <button>Save Property</button>
      </div>
    </div>
  );
}
