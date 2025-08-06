
import React from 'react';

export default function Modal({ property, isOpen, onClose }) {
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !property) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
        <h2>{property.name}</h2>
        
        <div>
          <p>Address: {property.address}</p>
        </div>

         <div>
          <p>Notes: {property.notes}</p>
         </div>

        <div>
          <h3>Tasks</h3>
          <div>
            {property.tasks.map((task) => (
              <div key={task.id}>
                  <div>Task:{task.name}</div>
                  <div>Due: {task.dueDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}