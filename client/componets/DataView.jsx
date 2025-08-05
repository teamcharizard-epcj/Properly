import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-data-grid/lib/styles.css';
import { TreeDataGrid, DataGrid } from 'react-data-grid';

export default function DataView() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  // This will eventually be a fetch
  useEffect(() => {
    setData({
      properties: [
        {
          id: 0,
          name: 'Beach House',
          tasks: [
            { id: 0, name: 'Replace Fridge Light', status: 'Pending' },
            { id: 1, name: 'Empty Trash', status: 'Pending' },
          ],
        },
        {
          id: 1,
          name: 'Mountain Cabin',
          tasks: [
            { id: 0, name: 'Replace Air Filter', status: 'Pending' },
            { id: 1, name: 'Close Crawlspace Vents', status: 'Pending' },
          ],
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (!data.properties) {
      return;
    }

    function getProperties() {
      const result = [];

      data.properties.forEach((j) => {
        result.push({ properties: j.name, tasks: j.id });
      });
      return result;
    }

    const myProperties = getProperties();

    setColumns([
      { key: 'properties', name: 'Properties' },
      { key: 'tasks', name: 'Address' },
    ]);
    setRows(myProperties);
  }, [data]);

  return <DataGrid columns={columns} rows={rows} />;
}
