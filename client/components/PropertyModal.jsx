import React from 'react';

export default function PropertyModal({ property, isOpen, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !property) {
    return null;
  }

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content'>
        <h2>{property.name}</h2>
        <div>
          <p>Address: {property.address}</p>
        </div>
        <div>
          <h3>Tasks</h3>
          <div>
            {property.tasks.map((task) => (
              <ul>
                <li>Task: {task.name}</li>
              </ul>
            ))}
          </div>
        </div>
        <button>Delete Property</button>
      </div>
    </div>
  );
}
