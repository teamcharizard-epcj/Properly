import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TaskModal from './TaskModal';
import AddTaskModal from './AddTaskModal';

export default function TaskView() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [addTaskBtn, setAddTaskBtn] = useState(null);

  const handleModalClose = () => {
    setSelectedTask(null);
    setAddTaskBtn(null);
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
    <div>
      <table className='dataView'>
        <thead>
          <tr>
            <th>Task</th>
            <th>Property</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.properties.map((j) => {
            return j.tasks.map((e) => {
              return (
                <tr key={e.id} onClick={() => setSelectedTask(e)}>
                  <td>{e.name}</td>
                  <td>{j.name}</td>
                  <td>{e.status}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </table>
      <button
        onClick={() => {
          setAddTaskBtn(true);
        }}>
        Add Task
      </button>

      <TaskModal
        task={selectedTask}
        isOpen={selectedTask}
        onClose={handleModalClose}
      />
      <AddTaskModal
        task={addTaskBtn}
        isOpen={addTaskBtn}
        onClose={handleModalClose}
      />
    </div>
  );
}
