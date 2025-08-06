import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropertyModal from './PropertyModal';
import AddPropertyModal from './AddPropertyModal';

export default function PropertyView() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [addPropertyBtn, setAddPropertyBtn] = useState(null);

  const handleModalClose = () => {
    setSelectedProperty(null);
    setAddPropertyBtn(null);
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
          { id: 2, name: 'Pest Prevention', status: 'Pending' },
        ],
      },
    ],
  };

  return (
    <div className="dataWrapper">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Address</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {data.properties.map((e) => {
            return (
              <tr key={e.id} onClick={() => setSelectedProperty(e)}>
                <td>{e.name}</td>
                <td>{e.address}</td>
                <td>{e.tasks.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => {
          setAddPropertyBtn(true);
        }}>
        Add Property
      </button>
      <PropertyModal
        property={selectedProperty}
        isOpen={selectedProperty}
        onClose={handleModalClose}
      />
      <AddPropertyModal
        task={addPropertyBtn}
        isOpen={addPropertyBtn}
        onClose={handleModalClose}
      />
    </div>
  );
}
