import React from "react";
import {
  ChevronRight,
  Home,
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
  PlusCircle,
  Filter,
  Award,
  Edit,
  Archive,
  Share2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { getTaskById, deleteTaskById } from "../api/service";
import { useState } from "react";
import ProjectCard from "../Component/projectCard";
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

  // Function to handle task deletion
  const handleDelete = async (taskId) => {
    try {
      await deleteTaskById(taskId);
      // Remove task from state after successful deletion
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       Loading project data...
  //     </div>
  //   );
  // }

  return (
    <div className="flex h-screen bg-gray-50">
      <span className="h-screen top-0 flex-shrink-0 z-50 ">
        <Sidebar />
      </span>
      <div className=" flex flex-col flex-1">
        <Header />
        {/* Main content area */}
        <div className="flex-1  bg-gray-200">
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
            <div className="bg-gradient-to-r from-blue-800 to-purple-600 text-white rounded-xl shadow-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
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
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Project Card */}
              <ProjectCard />
              <div className="lg:w-2/3">
                {/* Task Statistics */}
                <StatusDashboard />
                {/* Task Actions */}
                <div className="flex flex-col md:flex-row gap-4">
                  <button className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-gray-800 font-medium p-2 rounded-xl flex-grow text-center transition duration-300 flex items-center justify-center shadow-sm border border-blue-100 hover:shadow-md">
                    <FileText className="w-5 h-5 mr-3 text-blue-700" /> VIEW ALL
                    TASKS
                  </button>
                  <button
                    onClick={handleAdd}
                    className="bg-gradient-to-r  from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-medium p-2 rounded-xl transition duration-300  flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <PlusCircle className="w-5 h-5 mr-3" /> ADD NEW TASK
                  </button>
                  <button className="bg-gradient-to-r  from-blue-600 to-blue-400 hover:from-gray-700 hover:to-indigo-700 text-white text-xs font-medium p-2 rounded-xl transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                    <Filter className="w-5 h-5 mr-3" /> Filter
                  </button>
                </div>
                {/* taskDetail-Section  */}
                <TaskManagement />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
