import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { FileUp, ChevronRight, AlertCircle, CheckCircle, Clock, Users, HelpCircle } from 'lucide-react';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('');
  const [projectType, setProjectType] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [priority, setPriority] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [sendNotification, setSendNotification] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0].name);
    }
  };

  const handleAssigneeToggle = (name) => {
    if (assignees.includes(name)) {
      setAssignees(assignees.filter(item => item !== name));
    } else {
      setAssignees([...assignees, name]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      taskName, 
      category, 
      projectType, 
      description, 
      selectedFile, 
      priority, 
      assignees, 
      sendNotification
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar positioned at the left */}
      <Sidebar />
      
      {/* Main content area with header and content */}
      <div className="flex flex-col flex-1">
        {/* Header positioned at the top of the main content area */}
        <Header />
        
        {/* Main content area that takes remaining space */}
        <div className="flex-1 overflow-auto p-4 bg-gray-300">
          {/* Breadcrumbs */}
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600">Dashboard</a>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <a href="#" className="hover:text-blue-600">Tasks</a>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-gray-800 font-medium">Add Task</span>
              </li>
            </ol>
          </nav>
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Left side - Form */}
            <div className="md:w-2/3 bg-white rounded-lg p-6 shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="bg-gradient-to-r from-blue-800 to-purple-600 text-white rounded-lg shadow-md p-2 mb-6">
                  <h1 className="text-xl font-bold text-center">Add Task</h1>
                </div>

                {/* Task Name and Category */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="TASK NAME..."
                    className="flex-1 p-2 rounded border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <select
                    className="flex-1 p-2 rounded border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none bg-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled selected>SELECT CATEGORY</option>
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Project type*/}
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
                  <p className="font-medium text-gray-700 mb-2">PROJECT TYPE</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <label className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded transition-colors">
                      <input 
                        type="radio" 
                        name="projectType" 
                        value="landing-page" 
                        checked={projectType === 'landing-page'}
                        onChange={() => setProjectType('landing-page')}
                        className="form-radio text-blue-600"
                      />
                      <span className="text-sm">LANDING PAGE</span>
                    </label>
                    <label className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded transition-colors">
                      <input 
                        type="radio" 
                        name="projectType" 
                        value="static-website" 
                        checked={projectType === 'static-website'}
                        onChange={() => setProjectType('static-website')}
                        className="form-radio text-blue-600"
                      />
                      <span className="text-sm">STATIC MULTI PAGE WEBSITE</span>
                    </label>
                    <label className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded transition-colors">
                      <input 
                        type="radio" 
                        name="projectType" 
                        value="dynamic-website" 
                        checked={projectType === 'dynamic-website'}
                        onChange={() => setProjectType('dynamic-website')}
                        className="form-radio text-blue-600"
                      />
                      <span className="text-sm">DYNAMIC WEBSITE</span>
                    </label>
                    <label className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded transition-colors">
                      <input 
                        type="radio" 
                        name="projectType" 
                        value="ecommerce-website" 
                        checked={projectType === 'ecommerce-website'}
                        onChange={() => setProjectType('ecommerce-website')}
                        className="form-radio text-blue-600"
                      />
                      <span className="text-sm">E-COMMERCE WEBSITE</span>
                    </label>
                    <label className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded transition-colors">
                      <input 
                        type="radio" 
                        name="projectType" 
                        value="mobile-app" 
                        checked={projectType === 'mobile-app'}
                        onChange={() => setProjectType('mobile-app')}
                        className="form-radio text-blue-600"
                      />
                      <span className="text-sm">MOBILE APP</span>
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <textarea
                    placeholder="ADD BRIEF DESCRIPTION..."
                    className="w-full p-4 rounded border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-24 resize-y"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 flex items-center">
                    <label className="bg-blue-50 text-blue-600 border border-blue-200 text-center py-2 px-4 rounded cursor-pointer hover:bg-blue-100 transition-colors flex items-center">
                      <FileUp className="mr-2 h-4 w-4" />
                      CHOOSE FILE
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleFileChange}
                      />
                    </label>
                    <div className="ml-2 text-gray-600 text-sm">
                      {selectedFile ? selectedFile : 'UPLOAD FILE'}
                    </div>
                  </div>
                  <select
                    className="flex-1 p-2 rounded border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none bg-white"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="" disabled selected>SET PRIORITY</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
                  <p className="font-medium text-gray-700 mb-2">ASSIGNEES</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['AKASH UPADHYAY', 'HARISH KUMAR', 'PRIYA SHARMA', 'RAJESH PATEL', 'ANITA DESAI'].map((name, index) => (
                      <label key={index} className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded transition-colors">
                        <input 
                          type="checkbox" 
                          checked={assignees.includes(name)}
                          onChange={() => handleAssigneeToggle(name)}
                          className="form-checkbox text-blue-600"
                        />
                        <span className="text-sm">{name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors">
                    <input 
                      type="checkbox" 
                      checked={sendNotification}
                      onChange={() => setSendNotification(!sendNotification)}
                      className="form-checkbox text-blue-600"
                    />
                    <span>SEND NOTIFICATION ON EMAIL</span>
                  </label>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-500 transition-colors shadow-md flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    ASSIGN TASK
                  </button>
                </div>
              </form>
            </div>
            
            {/* Right side - Task information panel */}
            <div className="md:w-1/3 bg-white rounded-lg p-6 shadow-md">
              <div className="bg-gradient-to-r from-blue-800 to-purple-600 text-white rounded-lg shadow-md p-2 mb-6">
                <h2 className="text-xl font-bold text-center">Task Information</h2>
              </div>
              
              {/* Task Statistics */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium">Completed</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">24</p>
                    <p className="text-sm text-gray-600">tasks this month</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-orange-500 mr-2" />
                      <span className="font-medium">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">12</p>
                    <p className="text-sm text-gray-600">tasks to complete</p>
                  </div>
                </div>
              </div>
              
              {/* Team Members */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Team Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium mr-3">A</div>
                    <div>
                      <p className="font-medium">Akash Upadhyay</p>
                      <p className="text-sm text-gray-600">Completed 5 tasks today</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-medium mr-3">s</div>
                    <div>
                      <p className="font-medium">Shubham</p>
                      <p className="text-sm text-gray-600">Assigned to 3 new tasks</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-medium mr-3">s</div>
                    <div>
                      <p className="font-medium">Simran Sharma</p>
                      <p className="text-sm text-gray-600">Completed 7 tasks this week</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tips section */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-start mb-2">
                  <HelpCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <h3 className="text-lg font-semibold text-gray-800">Task Creation Tips</h3>
                </div>
                <ul className="text-sm text-gray-700 space-y-2 pl-7">
                  <li className="list-disc">Be specific with task names for clarity</li>
                  <li className="list-disc">Set appropriate priorities to help team members plan</li>
                  <li className="list-disc">Include all relevant files and documentation</li>
                  <li className="list-disc">Add detailed descriptions to avoid confusion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;