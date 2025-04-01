import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import smart from "../assets/smart.jpeg";
import { NavLink } from "react-router-dom";
import {
  Briefcase,
  User,
  Phone,
  Mail,
  MapPin,
  CheckSquare,
  FileText,
  Tag,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import {
  getProjectById,
  deleteProjectById,
  updateProjectById,
} from "../api/service";

function ProjectDashboardFile() {
  // Project state
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "SMART REALTY CRM SOFTWARE",
      subtitle: "DEVELOPMENT, BILLING",
      creator: "VIKASH ARYA",
      deadline: "02 MARCH 2025",
      members: 5,
      status: "RUNNING",
      color: "bg-gray-50",
      progress: 75,
    },
    {
      id: 2,
      name: "FINANCE MANAGEMENT APP",
      subtitle: "DEVELOPMENT, TESTING",
      creator: "VIKASH ARYA",
      deadline: "15 MARCH 2025",
      members: 4,
      status: "RUNNING",
      color: "bg-gray-50",
      progress: 60,
    },
    {
      id: 3,
      name: "E-COMMERCE PLATFORM",
      subtitle: "DESIGN, DEVELOPMENT",
      creator: "VIKASH ARYA",
      deadline: "21 MARCH 2025",
      members: 7,
      status: "RUNNING",
      color: "bg-gray-50",
      progress: 40,
    },
    {
      id: 4,
      name: "INVENTORY MANAGEMENT SYSTEM",
      subtitle: "DEVELOPMENT, QA",
      creator: "VIKASH ARYA",
      deadline: "30 MARCH 2025",
      members: 6,
      status: "RUNNING",
      color: "bg-gray-50",
      progress: 25,
    },
  ]);

  const [projectData, setProjectData] = useState({
    projectTitle: "",
    projectCategory: "",
    projectDescription: "",
    subCategories: {
      development: false,
      billing: false,
      development2: false,
      development3: false,
      development4: false,
    },
    clientDetails: {
      companyName: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      address: "",
    },
    assignedTo: {},
    tasks: [],
  });

  const handleCheckboxChange = (category, key) => {
    setProjectData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [key]: !prevData[category][key],
      },
    }));
  };

  const handleTaskChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTasks = [...(projectData.tasks || [])]; // Ensure tasks exist
    updatedTasks[index] = { ...updatedTasks[index], [name]: value };

    setProjectData((prevData) => ({
      ...prevData,
      tasks: updatedTasks,
    }));
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;

  // Popup state
  const [showPopup, setShowPopup] = useState(false);

  // New project form state
  const [newProject, setNewProject] = useState({
    name: "",
    subtitle: "",
    creator: "VIKASH ARYA",
    deadline: "",
    members: 1,
    status: "RUNNING",
    color: "bg-gray-50",
    progress: 0,
  });

  // Get current projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Handle add button when clicked
  const handleAdd = () => {
    setShowPopup(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  // Fetch project by ID (Replace 'your_project_id' with actual ID)
  const fetchProject = async (projectId) => {
    try {
      const response = await getProjectById(projectId);
      if (response.success) {
        setSelectedProject(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error fetching project.");
    }
  };

  // Handle delete project
  const handleDeleteProject = async (projectId) => {
    try {
      const response = await deleteProjectById(projectId);
      if (response.success) {
        toast.success("Project deleted successfully!");
        setProjects(projects.filter((project) => project.id !== projectId));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error deleting project.");
    }
  };

  // Handle update project
  const handleUpdateProject = async (projectId, updatedData) => {
    try {
      const response = await updateProjectById(projectId, updatedData);
      if (response.success) {
        toast.success("Project updated successfully!");
        fetchProject(projectId); // Refresh project details
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error updating project.");
    }
  };

  useEffect(() => {
    fetchProject("67eae84feb98a8c0d3b9dc3e"); // Replace with actual project ID
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProject(newProject);
      if (response.success) {
        toast.success(`Project added: ${response.data}`);

        // ✅ Update projects state to reflect new project
        setProjects([...projects, response.data]);

        setNewProject({
          name: "",
          subtitle: "",
          creator: "VIKASH ARYA",
          deadline: "",
          members: 1,
          status: "RUNNING",
          color: "bg-gray-50",
          progress: 0,
        });
        navigate("/projectdashboard");
      } else {
        toast.error(
          `Project adding failed: ${response.message || "Unknown error"}`
        );
      }
    } catch (error) {
      toast.error(`Project Creation Error: ${error.message || error}`);
    }
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header />
        {/* Content below header */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Breadcrumb navigation */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <NavLink
                  to="/dashboard"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <NavLink
                    to="/project"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors md:ml-2"
                  >
                    Projects
                  </NavLink>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <NavLink
                    to="/projectdetail"
                    className="ml-1 text-sm font-medium text-blue-600 md:ml-2"
                  >
                    All Projects
                  </NavLink>
                </div>
              </li>
            </ol>
          </nav>

          {/* Main card container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header and actions */}
            <div className="bg-gray-50 border-b px-6 py-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  All Projects
                </h2>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  {/* Search Bar */}
                  <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="w-full pl-10 py-2 px-4 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                    />
                  </div>

                  {/* Add New Button */}
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
                    onClick={handleAdd}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    Add New Project
                  </button>
                </div>
              </div>
            </div>

            {/* Projects List */}
            <div className="p-6">
              <div className="space-y-5">
                {currentProjects.map((project) => (
                  <NavLink
                    to="/projectdetail"
                    key={project.id}
                    className="block"
                  >
                    <div
                      className={`${project.color} rounded-lg shadow-md hover:shadow-lg transition-shadow`}
                    >
                      <div className="p-3">
                        <div className="flex flex-col md:flex-row md:items-center">
                          {/* Left content - project info */}
                          <div className="flex items-start mb-4 md:mb-0">
                            <div className="bg-white shadow-md h-16 w-16 rounded-full flex-shrink-0 mr-4 overflow-hidden border-2 border-white">
                              <img
                                src={smart}
                                alt={project.name}
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div>
                              <h2 className="text-xs sm:text-sm md:text-base lg:text-md xl:text-sm font-bold text-gray-800">
                                {project.name}
                              </h2>
                              <p className="text-gray-600 text-xs">
                                {project.subtitle}
                              </p>
                              <div className="flex items-center mt-1">
                                <p className="text-xs text-gray-600">
                                  {project.creator}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Right content - project stats */}
                          <div className="md:ml-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                            {/* Deadline */}
                            <div className="text-center md:text-left">
                              <p className="text-gray-900 text-sm mb-1 font-semibold">
                                DEADLINE
                              </p>
                              <div className="flex items-center">
                                <svg
                                  className="w-4 h-4 text-red-500 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  ></path>
                                </svg>
                                <p className=" text-xs text-red-500">
                                  {project.deadline}
                                </p>
                              </div>
                            </div>

                            {/* Team */}
                            <div className="text-center md:text-left">
                              <p className="text-gray-900 text-sm mb-1 font-semibold">
                                TEAM
                              </p>
                              <div className="flex items-center">
                                <svg
                                  className="w-4 h-4 text-blue-500 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                  ></path>
                                </svg>
                                <p className="text-xs font-serif text-blue-500">
                                  {project.members} MEMBERS
                                </p>
                              </div>
                            </div>

                            {/* Status */}
                            <div>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                <span className="w-2 h-2 mr-1 bg-indigo-500 rounded-full"></span>
                                {project.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-1 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>

                {Array.from({
                  length: Math.ceil(projects.length / projectsPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-1 rounded-md ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < Math.ceil(projects.length / projectsPerPage)
                        ? prev + 1
                        : prev
                    )
                  }
                  disabled={
                    currentPage === Math.ceil(projects.length / projectsPerPage)
                  }
                  className={`px-4 py-1 rounded-md ${
                    currentPage === Math.ceil(projects.length / projectsPerPage)
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-100 rounded-lg shadow-xl  p-6">
            {" "}
            {/* Increased size and added padding */}
            <div className="border-b px-6  flex justify-end items-center">
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Header section with gradient background - reduced padding */}
              <div className="p-2 rounded-lg mb-3">
                <h2 className="text-blue-600 text-2xl font-bold text-center">
                  ADD NEW PROJECT
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="  text-xs font-medium text-gray-800 mb-1 flex items-center gap-1">
                    <Briefcase size={14} />
                    PROJECT TITLE
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={projectData.projectTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-indigo-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className=" text-xs font-medium text-gray-800 mb-1 flex items-center gap-1">
                    <Tag size={14} />
                    PROJECT CATEGORY
                  </label>
                  <select
                    name="projectCategory"
                    value={projectData.projectCategory}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-indigo-500 text-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent appearance-none transition-all"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238B5CF6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "0.75rem",
                    }}
                  >
                    <option value="">Select Category</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className=" text-xs font-medium text-gray-800 mb-1 flex items-center gap-1">
                  <FileText size={14} />
                  PROJECT DESCRIPTION
                </label>
                <textarea
                  name="projectDescription"
                  value={projectData.projectDescription}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-50 border border-indigo-500 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              {/* Client Details Section - more compact layout */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-700">
                <label className=" text-xs font-bold text-gray-800 mb-2 border-b border-gray-700 pb-1 flex items-center gap-1">
                  <User size={14} />
                  CLIENT DETAILS
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="relative col-span-2 md:col-span-1">
                    <input
                      type="text"
                      name="clientDetails.companyName"
                      placeholder="COMPANY NAME"
                      value={projectData.clientDetails.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pl-8 bg-gray-100 shadow-md  text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition-all text-sm"
                    />
                    <Briefcase
                      size={14}
                      className="absolute top-2.5 left-2.5 text-gray-400"
                    />
                  </div>
                  <div className="relative col-span-2 md:col-span-1">
                    <input
                      type="text"
                      name="clientDetails.contactName"
                      placeholder="CONTACT PERSON NAME"
                      value={projectData.clientDetails.contactName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pl-8 bg-gray-100 shadow-md  text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition-all text-sm"
                    />
                    <User
                      size={14}
                      className="absolute top-2.5 left-2.5 text-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="clientDetails.contactPhone"
                      placeholder="CONTACT PHONE"
                      value={projectData.clientDetails.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pl-8 bg-gray-100 shadow-md  text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition-all text-sm"
                    />
                    <Phone
                      size={14}
                      className="absolute top-2.5 left-2.5 text-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="clientDetails.contactEmail"
                      placeholder="CONTACT EMAIL"
                      value={projectData.clientDetails.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pl-8 bg-gray-100 shadow-md  text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition-all text-sm"
                    />
                    <Mail
                      size={14}
                      className="absolute top-2.5 left-2.5 text-gray-400"
                    />
                  </div>
                  <div className="md:col-span-2 relative">
                    <input
                      type="text"
                      name="clientDetails.address"
                      placeholder="ADDRESS"
                      value={projectData.clientDetails.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pl-8 bg-gray-100 shadow-md  text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition-all text-sm"
                    />
                    <MapPin
                      size={14}
                      className="absolute top-2.5 left-2.5 text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Assigned To Section - horizontal layout */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-700">
                <label className="text-xs font-bold text-gray-800 mb-2 border-b border-gray-700 pb-1 flex items-center gap-1">
                  <CheckSquare size={14} />
                  ASSIGNED TO
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(projectData.assignedTo).map((person, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-900 px-2 py-1 rounded-md border border-gray-700 hover:border-indigo-400 transition-all"
                    >
                      <input
                        type="checkbox"
                        id={`person-${index}`}
                        checked={projectData.assignedTo[person]}
                        onChange={() =>
                          handleCheckboxChange("assignedTo", person)
                        }
                        className="w-3.5 h-3.5 mr-1.5 accent-indigo-500"
                      />
                      <label
                        htmlFor={`person-${index}`}
                        className="text-xs text-gray-300 cursor-pointer"
                      >
                        AKASH UPADHYAY
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Section - more compact */}
              <div>
                <label className=" text-xs font-bold text-gray-800 mb-2 border-b border-gray-700 pb-1 flex items-center gap-1">
                  <FileText size={14} />
                  TASK & NOTES (OPTIONAL)
                </label>
                {projectData.tasks.map((task, index) => (
                  <div
                    key={index}
                    className="space-y-3 p-3 bg-gray-50 border border-gray-700 rounded-lg mb-3 hover:border-indigo-400 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-800 font-medium">
                        TASK #{index + 1}
                      </span>
                      <span className="text-xs bg-gray-900 px-1.5 py-0.5 rounded text-gray-400">
                        ID: TASK-{index + 1000}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          placeholder="TASK NAME"
                          value={task.name}
                          onChange={(e) => handleTaskChange(e, index)}
                          className="w-full px-3 py-2 pl-8 bg-gray-100 shadow-md  text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition-all text-sm"
                        />
                        <FileText
                          size={14}
                          className="absolute top-2.5 left-2.5 text-gray-400"
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name="category"
                          placeholder="CATEGORY"
                          value={task.category}
                          onChange={(e) => handleTaskChange(e, index)}
                          className="w-full px-3 py-2 pl-8 bg-gray-100 shadow-md  text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition-all text-sm"
                        />
                        <Tag
                          size={14}
                          className="absolute top-2.5 left-2.5 text-gray-400"
                        />
                      </div>
                      <div className="relative">
                        <select
                          name="priority"
                          value={task.priority}
                          onChange={(e) => handleTaskChange(e, index)}
                          className="w-full px-3 py-2 pl-8 bg-gray-100 shadow-md  text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent appearance-none transition-all text-sm"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238B5CF6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.75rem center",
                            backgroundSize: "0.75rem",
                          }}
                        >
                          <option value="">SET PRIORITY</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                        <AlertTriangle
                          size={14}
                          className="absolute top-2.5 left-2.5 text-gray-400"
                        />
                      </div>
                    </div>
                    <textarea
                      name="description"
                      placeholder="TASK DESCRIPTION"
                      value={task.description}
                      onChange={(e) => handleTaskChange(e, index)}
                      rows="2"
                      className="w-full px-3 py-2 bg-gray-100 shadow-md  text-white rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition-all resize-none text-sm"
                    ></textarea>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-md hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition-all shadow-md text-sm"
                >
                  SAVE AND ADD PROJECT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDashboardFile;
