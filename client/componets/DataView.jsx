import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-data-grid/lib/styles.css';
import { TreeDataGrid, DataGrid } from 'react-data-grid';

export default function DataView() {
  const columns = [
    { key: 'id', name: 'ID' },
    { key: 'title', name: 'Title' },
  ];

  const rows = [
    { id: 0, title: 'Example' },
    { id: 1, title: 'Demo' },
  ];

  return <DataGrid columns={columns} rows={rows} />;
}
