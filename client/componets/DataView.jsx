import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from './Modal'


export default function DataView() {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleModalClose = () => {
  setSelectedProperty(null);
};

  const data = {
    properties: [
      {
        id: 0,
        name: 'Beach House',
        address: 'Sunset dr 10',
        tasks: [
          { id: 0, name: 'Replace Fridge Light', status: 'Pending' },
          { id: 1, name: 'Empty Trash', status: 'Pending' },
        ],
      },
      {
        id: 1,
        name: 'Mountain Cabin',
        address: 'Peak road 120',
        tasks: [
          { id: 0, name: 'Replace Air Filter', status: 'Pending' },
          { id: 1, name: 'Close Crawlspace Vents', status: 'Pending' },
          { id: 1, name: 'Pest Prevention', status: 'Pending' },
        ],
      },
    ],
  };

  return (
    <div>
      <table className="dataView">
        <thead>
          <tr>
            <th>Property</th>
            <th>Address</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {data.properties.map((e) => {
            return(<tr key={e.id}>
             <td> <button onClick={() => setSelectedProperty(e)}>
                 
              {e.name}
               </button>
               </td>

              <td>{e.address}</td>
              <td>{e.tasks.length}</td>
            </tr>)
          })}
        </tbody>
      </table>
        <Modal
        property={selectedProperty}
        isOpen={selectedProperty}
        onClose={handleModalClose}
      />

    </div>
  );
}
