import React from "react";
import { ChevronRight, Home, Award, Edit, Archive, Share2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { useState } from "react";
import ProjectCard from "../Component/projectDetailCard";
import ProjectCounter from "../pages/ProjectCounters";
import UserActivityTimeline from "./ProjectActivity";
import StatusDashboard from "../Component/statusDashboard";
import TaskManagement from "./TaskManagement";

const ProjectDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const [projectData, setProjectData] = useState({
    name: "SMART REALTY CRM SOFTWARE",
    status: "RUNNING",
    category: "DEVELOPMENT, BILLING",
    subCategory: "--",
    startDate: "1 JAN 2025 04:30 PM",
    deadline: "01 MARCH 2025 12:00 PM",
    createdBy: "VIKASH ARYA",
    createdAt: "1 JAN 2025 04:30 PM",
    clientName: "MEGHRAJ SINGH",
    clientPhone: "+91 8115006334",
    clientEmail: "AKASH@EXAMPLE.COM",
    stats: {
      totalTasks: 4,
      totalMembers: 2,
      activeTasks: 1,
      freshTasks: 1,
      completedTasks: 1,
      inactiveTasks: 2,
      overdueTasks: 1,
    },
    completionPercentage: 25,
    priority: "High",
  });

  const handleAdd = () => {
    window.location.href = "/addtask";
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-auto">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 z-50">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col pl-64">
        <div className="sticky top-0 z-40">
          <Header />
        </div>
        {/* Main content area */}
        <div className="flex-1  bg-gray-100">
          <div className="container mx-auto px-4 py-6">
            {/* Breadcrumbs */}
            <nav className="flex mb-6" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <NavLink
                    to="/dashboard"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <NavLink
                      to="/project"
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 md:ml-2"
                    >
                      Projects
                    </NavLink>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-sm font-medium text-blue-600 md:ml-2">
                      Smart Realty CRM
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Header with Action Buttons */}
            {/* <div className="bg-gradient-to-r from-blue-800 to-purple-600 text-white rounded-xl shadow-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Award className="w-8 h-8 mr-3 text-yellow-300" />
                <div>
                  <h1 className="text-2xl font-bold">Project Detail</h1>
                  <p className="text-blue-100 text-sm">
                    Viewing all details for {projectData.name}
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all duration-200">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </button>
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all duration-200">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </button>
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md flex items-center text-sm font-medium transition-all duration-200">
                  <Archive className="w-4 h-4 mr-2" /> Archive
                </button>
              </div>
            </div> */}

            <StatusDashboard />

            {/* Content Area - Left & Right Layout */}
            <div className="flex flex-col space-y-6">
              {/* Header Section with Title and possible action buttons */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Project Overview
                </h2>
                <div className="flex space-x-3">
                  {/* Optional action buttons could go here */}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Project Card - takes 1/3 space on extra large screens */}
                <div className="xl:col-span-1 bg-white rounded-lg shadow-md">
                  <ProjectCard />
                </div>

                {/* User Activity Timeline - takes 2/3 space on extra large screens */}
                <div className="xl:col-span-2 rounded-lg">
                  <UserActivityTimeline />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
