import React, { useState } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const TaskManagement = () => {
  const [allTasks, setAllTasks] = useState([
    {
      id: 1,
      name: 'SMART REALTY CRM SOFTWARE',
      category: 'DIGITAL MARKETING DEVELOPMENT',
      status: 'FRESH',
      deadline: '12 FEB 2025, 12:00 PM',
      assignedTo: 'AKASH UPADHYAY',
      timeLeft: '2 more...'
    },
    {
      id: 2,
      name: 'Create Website',
      category: 'DIGITAL MARKETING DEVELOPMENT',
      status: 'pending',
      deadline: '12 FEB 2025, 12:00 PM',
      assignedTo: 'AKASH UPADHYAY',
      timeLeft: '2 more...'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  const totalPages = Math.ceil(allTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = allTasks.slice(indexOfFirstTask, indexOfLastTask);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (id) => {
    alert(`Editing task with ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete task with ID: ${id}?`)) {
      setAllTasks(allTasks.filter(task => task.id !== id));
    }
  };

  const handleAdd = () => {
    window.location.href = '/addtask';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Header */}
      <div className="ml-[250px]">
        <Header />
      </div>

      {/* Main Content */}
      <div className="ml-[250px] p-4">
        
        {/* Breadcrumb */}
         <nav className="flex mb-6" aria-label="Breadcrumb">
           <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <NavLink to='/dashboard'  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                  </svg>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <NavLink to='/project' className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors md:ml-2">Projects</NavLink>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <NavLink to='/projectdetail' className="ml-1 text-sm font-medium text-blue-600 md:ml-2">All Projects</NavLink>
                </div>
              </li>
            </ol>        
          </nav>

        {/* Heading */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-800 text-center py-2 rounded-lg mb-4">
          <h1 className="text-lg font-semibold text-white">ALL TASK</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mb-4 gap-2">
          <button className="bg-blue-800 text-white px-6 py-1 rounded-lg text-sm font-medium" onClick={handleAdd}>ADD NEW</button>
          <button className="bg-gray-800 text-white px-6 py-1 rounded-lg text-sm font-medium">FILTER</button>
        </div>

        {/* Task Table */}
        <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="bg-blue-400 text-white font-semibold">
          <th className="py-2 px-3 text-left">SR</th>
          <th className="py-2 px-3 text-left">TASK NAME</th>
          <th className="py-2 px-3 text-left">TASK SUB NAME/CATEGORY</th>
          <th className="py-2 px-3 text-left">STATUS</th>
          <th className="py-2 px-3 text-left">DEADLINE</th>
          <th className="py-2 px-3 text-left">ASSIGNED TO</th>
          <th className="py-2 px-3 text-left">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {currentTasks.map((task) => (
          <tr key={task.id} className="bg-white border-b border-blue-200">
            <td className="py-4 px-3">{task.id}.</td>
            <NavLink to="/taskdetailpage" >
              <td className="py-4 px-3">{task.name}</td>
            </NavLink>
            <td className="py-4 px-3 text-xs">{task.category}</td>
            <td className="py-4 px-3">{task.status}</td>
            <td className="py-4 px-3 text-xs">{task.deadline}</td>
            <td className="py-4 px-3 text-xs">
              {task.assignedTo}
              <div className="text-xs text-gray-500">{task.timeLeft}</div>
            </td>
            <td className="py-4 px-3">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEdit(task.id)} 
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(task.id)} 
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
        {currentTasks.map((task) => (
          <tr key={task.id} className="bg-white border-b border-blue-200">
            <td className="py-4 px-3">{task.id}.</td>
            <NavLink to="/taskdetailpage" >
              <td className="py-4 px-3">{task.name}</td>
            </NavLink>
            <td className="py-4 px-3 text-xs">{task.category}</td>
            <td className="py-4 px-3">{task.status}</td>
            <td className="py-4 px-3 text-xs">{task.deadline}</td>
            <td className="py-4 px-3 text-xs">
              {task.assignedTo}
              <div className="text-xs text-gray-500">{task.timeLeft}</div>
            </td>
            <td className="py-4 px-3">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEdit(task.id)} 
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(task.id)} 
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
        {currentTasks.map((task) => (
          <tr key={task.id} className="bg-white border-b border-blue-200">
            <td className="py-4 px-3">{task.id}.</td>
            <NavLink to="/taskdetailpage" >
              <td className="py-4 px-3">{task.name}</td>
            </NavLink>
            <td className="py-4 px-3 text-xs">{task.category}</td>
            <td className="py-4 px-3">{task.status}</td>
            <td className="py-4 px-3 text-xs">{task.deadline}</td>
            <td className="py-4 px-3 text-xs">
              {task.assignedTo}
              <div className="text-xs text-gray-500">{task.timeLeft}</div>
            </td>
            <td className="py-4 px-3">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEdit(task.id)} 
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(task.id)} 
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

        
  {/* bottom text */}
  <div className="mt-4 flex justify-between items-center">
    <div className="text-sm text-gray-600">
      TOTAL {allTasks.length} RECORD FOUND!
    </div>

        
    <div className="flex gap-2">
      <button 
        className={`px-3 py-1 rounded text-sm ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        onClick={goToPrevPage}
        disabled={currentPage === 1}
      >
        PRE
      </button>
      <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
        {currentPage.toString().padStart(2, '0')}
      </button>
      <button 
        className={`px-3 py-1 rounded text-sm ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        NEXT
      </button>
    </div>
  </div>
      </div>
    </div>
  );
};

export default TaskManagement;

 
    