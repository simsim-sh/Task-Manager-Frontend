import React, { useState } from 'react';

const ProjectForm = () => {
  const [projectData, setProjectData] = useState({
    projectTitle: '',
    projectCategory: '',
    projectDescription: '',
    subCategories: {
      development: false,
      billing: false,
      development2: false,
      development3: false,
      development4: false,
      development5: false
    },
    clientDetails: {
      companyName: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      address: ''
    },
    assignedTo: {
      akash1: false,
      akash2: false,
      akash3: false,
      akash4: false,
      akash5: false,
      akash6: false
    },
    tasks: [{
      name: '',
      category: '',
      priority: '',
      description: '',
      startDate: '',
      endDate: ''
    }]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setProjectData({
        ...projectData,
        [section]: {
          ...projectData[section],
          [field]: value
        }
      });
    } else {
      setProjectData({
        ...projectData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (section, field) => {
    setProjectData({
      ...projectData,
      [section]: {
        ...projectData[section],
        [field]: !projectData[section][field]
      }
    });
  };

  const handleTaskChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTasks = [...projectData.tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      [name]: value
    };
    
    setProjectData({
      ...projectData,
      tasks: updatedTasks
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', projectData);
    // Add your submit logic here
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-200 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <button 
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
        >
          ADD NEW PROJECT
        </button>
      </div>

      
    </div>
  );
};

export default ProjectForm;