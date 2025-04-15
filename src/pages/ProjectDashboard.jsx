import React, { useState, useEffect } from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import smart from "../assets/images/smart.jpeg";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { HiHome, HiChevronRight } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import {
  getProjectById,
  deleteProjectById,
  getAllProject,
} from "../api/service";
import AddProjects from "../Component/addProjectpopup";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import ProjectCounters from "../pages/ProjectCounters";
import Swal from "sweetalert2";
import { formatDate } from "../utlis/helper";

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
        const sortedProjects = getAllProjectResponse.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllProjects(sortedProjects);
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
    if (shouldRefresh) {
      fetchData(); // refresh list if needed
    }
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
                  <HiHome className="w-4 h-4 mr-2 text-gray-700" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <div className="flex items-center">
                  <HiChevronRight className="w-3 h-3 text-gray-400 mx-1" />
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
                  <HiChevronRight className="w-3 h-3 text-gray-400 mx-1" />
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

          {/* Project Counters Section */}
          <ProjectCounters />
          {/* Main card container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden ">
            {/* Header and actions */}
            <div className="bg-gray-50 border-b px-6 py-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  All Projects
                </h2>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiSearch className="w-4 h-4 text-gray-500" />
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
                <div className="overflow-x-auto">
                  <div className="min-w-[1000px]">
                    {/* Column Headings */}
                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 border-b p-4 text-sm font-semibold bg-blue-800 text-white">
                      <div className="col-span-1">Project Name</div>
                      <div className="text-center">Status</div>
                      <div className="text-center">Progress</div>
                      <div className="text-center">Created Info</div>
                      <div className="text-center">Total Task Member</div>
                      <div className="text-right pr-4">Action</div>
                    </div>

                    {/* Rows */}
                    {currentProjects.map((project) => (
                      <div
                        key={project._id}
                        onClick={() => openPopup(project)}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 border-b p-4 cursor-pointer"
                      >
                        {/* Project Name, Image */}
                        <div className="flex items-start space-x-4">
                          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                            <img
                              src={smart}
                              alt={project.title}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <div className="min-w-0">
                            <NavLink to={`/project/${project._id}`}>
                              <h2 className="text-sm font-bold text-gray-800 truncate">
                                {project.title}
                              </h2>
                            </NavLink>

                            <p className="text-gray-600 text-xs">
                              {project.category}
                            </p>
                            <p className="text-xs text-gray-600">
                              {project.assignedTo}
                            </p>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="text-center">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                            <span className="w-2 h-2 mr-1 bg-indigo-500 rounded-full"></span>
                            {project.status}
                          </span>
                        </div>
                        {/* Progress */}
                        <div className="text-center">
                          <div className="relative w-full h-3 bg-gray-200 rounded-full">
                            <div
                              className="absolute top-0 left-0 h-3 bg-green-500 rounded-full"
                              style={{ width: `${project.progress || 0}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {project.progress || 0}%
                          </p>
                        </div>

                        {/* Created Info */}
                        <div className="text-center text-xs text-gray-600">
                          <p>
                            Created At: {formatDate(project.createdAt) || "N/A"}
                          </p>
                          <p>Created By: {project.created || "N/A"}</p>
                        </div>

                        {/* Total Task Members */}
                        <div className="text-center text-sm text-gray-800">
                          {project.totalTaskMembers || 0}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 justify-end pr-4">
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
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won’t be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#d33",
                                cancelButtonColor: "#3085d6",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleDeleteProject(project._id);
                                }
                              });
                            }}
                            className="size-6 cursor-pointer text-red-600"
                          />
                          {/* <MdDeleteForever
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project._id);
                            }}
                            className="size-6 cursor-pointer text-red-600"
                          /> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pagination Section */}
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
