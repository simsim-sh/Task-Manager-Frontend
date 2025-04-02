import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import smart from "../assets/smart.jpeg";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  getProjectById,
  deleteProjectById,
  getAllProject,
} from "../api/service";
import AddProjects from "../Component/addProject";
import { MdEdit, MdDeleteForever } from "react-icons/md";

function ProjectDashboardFile() {
  const { projectId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = allProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  //get all project
  const fetchData = async () => {
    try {
      const getAllProjectResponse = await getAllProject();
      if (getAllProjectResponse?.success) {
        setAllProjects(getAllProjectResponse?.data);
        // console.log("allProjects", getAllProjectResponse?.data);
      } else {
        toast.error(getAllProjectResponse?.message);
      }
    } catch (error) {
      toast.error("Error fetching project.");
    }
  };

  // Fetch project by ID
  const fetchProject = async (id) => {
    if (!id) return;
    try {
      const projectByIDResponse = await getProjectById(id);
      if (projectByIDResponse?.success) {
        setSelectedProject(projectByIDResponse?.data);
        // console.log("Fetched Project:", projectByIDResponse?.data);
      } else {
        toast.error(projectByIDResponse?.message);
      }
    } catch (error) {
      toast.error("Error fetching project.");
    }
  };

  // Handle delete project
  const handleDeleteProject = async (projectId) => {
    try {
      const deleteProjectResponse = await deleteProjectById(projectId);
      if (deleteProjectResponse?.success) {
        toast.success("Project deleted successfully!");
        setProjects(projects.filter((project) => project._id !== projectId));
        fetchData();
      } else {
        toast.error(
          deleteProjectResponse?.message || "Failed to delete project"
        );
      }
    } catch (error) {
      toast.error("Error deleting project.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId]);

  // Handle add button when clicked
  const openPopup = async (project) => {
    setShowPopup(true);
    setSelectedProject(project);
    // Fetch project details and ensure form fields are editable
    if (project?._id) {
      await fetchProject(project._id);
    }
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedProject(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
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
                  {/* Add New Button to open modal */}
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center"
                    onClick={openPopup}
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
                  <div
                    key={project._id}
                    onClick={() => openPopup(project)}
                    className="p-3 cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex items-start mb-4 md:mb-0">
                        <div className="bg-white shadow-md h-16 w-16 rounded-full flex-shrink-0 mr-4 overflow-hidden border-2 border-white">
                          <img
                            src={smart}
                            alt={project.title}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <h2 className="text-xs sm:text-sm md:text-base lg:text-md xl:text-sm font-bold text-gray-800">
                            {project.title}
                          </h2>
                          <p className="text-gray-600 text-xs">
                            {project.category}
                          </p>
                          <div className="flex items-center mt-1">
                            <p className="text-xs text-gray-600">
                              {project.assignedTo}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="md:ml-auto flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <div className="text-center md:text-left">
                          <p className="text-gray-900 text-sm mb-1 font-semibold">
                            STATUS
                          </p>
                          <div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                              <span className="w-2 h-2 mr-1 bg-indigo-500 rounded-full"></span>
                              {project.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-gray-900 text-sm mb-1 font-semibold">
                            CONTACT
                          </p>
                          <p className="text-xs text-gray-600">
                            {project.contactPerson} ({project.contactEmail})
                          </p>
                        </div>
                        <div className="text-center md:text-left">
                          <p className="text-gray-900 text-sm mb-1 font-semibold">
                            COMPANY
                          </p>
                          <p className="text-xs text-gray-600">
                            {project.companyName}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <MdEdit
                            onClick={(e) => {
                              e.stopPropagation();
                              openPopup(project);
                            }}
                            className="size-6 cursor-pointer text-blue-600"
                          />
                          <MdDeleteForever
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project._id);
                            }}
                            className="size-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center items-center mt-6 space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
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

                {/* Page Numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-1 rounded-md ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-1 rounded-md ${
                    currentPage === totalPages
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
        <AddProjects
          closePopup={closePopup}
          selectedProject={selectedProject}
        />
      )}
    </div>
  );
}

export default ProjectDashboardFile;
