import React from "react";
import {
  ChevronRight,
  Home,
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  Building,
  Tag,
  Layers,
  Activity,
  Users,
  PlayCircle,
  PlusCircle,
  Zap,
  Award,
  Star,
  BarChart,
  Edit,
  Archive,
  Share2,
  Download,
  Bookmark,
  Filter,
  Trash2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import smart from "../assets/images/smart.jpeg";
import { toast } from "react-hot-toast";
import { getTaskById, deleteTaskById, getAllTasks } from "../api/service";
import { useEffect, useState } from "react";

// Status to icon mapping
const getStatusIcon = (status) => {
  switch (status) {
    case "FRESH":
      return <Clock className="w-4 h-4 text-blue-500" />;
    case "IN PROGRESS":
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case "COMPLETED":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    default:
      return null;
  }
};

// Status to color class mapping
const getStatusColor = (status) => {
  switch (status) {
    case "FRESH":
      return "bg-blue-100 text-blue-800";
    case "IN PROGRESS":
      return "bg-yellow-100 text-yellow-800";
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Helper functions to calculate statistics - moved outside component
const calculateTotalMembers = (tasksData) => {
  // Extract unique member IDs from tasks
  const uniqueMembers = new Set();
  tasksData.forEach((task) => {
    if (task.assignedTo) {
      uniqueMembers.add(task.assignedTo);
    }
  });
  return uniqueMembers.size;
};

const isTaskFresh = (task) => {
  // Define what makes a task "fresh" - for example, created in the last 24 hours
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
  return new Date(task.createdAt) > twentyFourHoursAgo;
};

const isTaskOverdue = (task) => {
  // Check if task is overdue
  return (
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "completed"
  );
};

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

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all tasks
        const tasksData = await getAllTasks();
        setTasks(
          tasksData.length > 0
            ? tasksData
            : [
                {
                  sr: 1,
                  name: "Smart Reality",
                  category1: "Dev",
                  category2: "UI",
                  status: "FRESH",
                  deadline: "2025-03-10",
                  assignedTo: "Simran sharma",
                },
                {
                  sr: 2,
                  name: "Euphorica",
                  category1: "Design",
                  category2: "UX",
                  status: "IN PROGRESS",
                  deadline: "2025-03-15",
                  assignedTo: "Gazel",
                },
                {
                  sr: 3,
                  name: "Bhutani",
                  category1: "Testing",
                  category2: "QA",
                  status: "COMPLETED",
                  deadline: "2025-03-20",
                  assignedTo: "Sunny",
                },
              ]
        );

        // Process the tasks data to calculate statistics
        const stats = {
          totalTasks: tasksData.length,
          totalMembers: calculateTotalMembers(tasksData),
          activeTasks: tasksData.filter((task) => task.status === "active")
            .length,
          freshTasks: tasksData.filter((task) => isTaskFresh(task)).length,
          completedTasks: tasksData.filter(
            (task) => task.status === "completed"
          ).length,
          inactiveTasks: tasksData.filter((task) => task.status === "inactive")
            .length,
          overdueTasks: tasksData.filter((task) => isTaskOverdue(task)).length,
        };

        // Update project data with new stats
        setProjectData((prevState) => ({
          ...prevState,
          stats: stats,
        }));
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Fallback to sample data in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Progress calculation
  const progressPercentage =
    (projectData.stats.completedTasks / projectData.stats.totalTasks) * 100;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading project data...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="h-screen fixed top-0 flex-shrink-0 z-50 ">
        <Sidebar />
      </div>

      <div className=" flex flex-col flex-1  ml-12 md:ml-12 lg:ml-64">
        <div className="w-full fixed top-0 right-0 z-40 pl-12 lg:pl-56">
          <Header />
        </div>

        {/* Main content area */}
        <div className="flex-1 mt-12 bg-gray-200">
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
              <div className="bg-white rounded-2xl shadow-2xl  lg:w-1/3 border border-blue-50 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-indigo-400 to-purple-200 p-8">
                  <div className="flex justify-between items-center mb-6">
                    <span
                      className={`bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full flex items-center ${
                        projectData.status === "RUNNING"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      <Activity className="w-3 h-3 mr-1.5" />{" "}
                      {projectData.status}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Bookmark className="w-4 h-4 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors duration-200" />
                      <Star className="w-4 h-4 text-yellow-400 cursor-pointer hover:text-yellow-500 transition-colors duration-200" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-28 h-28 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mb-5 flex items-center justify-center overflow-hidden shadow-xl border-4 border-white">
                      <img
                        src={smart}
                        alt="smart"
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 text-center mb-1">
                      {projectData.name}
                    </h2>
                    <div className="text-xs text-gray-500 mb-3">
                      Project #SR-2025
                    </div>

                    {/* Project Priority */}
                    <div className="flex items-center bg-red-50 px-3 py-1.5 rounded-full">
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      <span className="text-xs font-medium text-red-700">
                        {projectData.priority} Priority
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 font-medium">
                        Project Completion
                      </span>
                      <span className="text-blue-600 font-semibold">
                        {progressPercentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <span className="text-gray-700 text-sm font-medium flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-blue-600" /> CATEGORY
                    </span>
                    <span className="font-medium text-gray-800 text-sm">
                      {projectData.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <span className="text-gray-700 text-sm font-medium flex items-center">
                      <Layers className="w-4 h-4 mr-2 text-blue-600" /> SUB
                      CATEGORY
                    </span>
                    <span className="font-medium text-gray-800 text-sm">
                      {projectData.subCategory}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <span className="text-gray-700 text-sm font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" /> START
                      DATE
                    </span>
                    <span className="font-medium text-gray-800 text-sm">
                      {projectData.startDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <span className="text-gray-700 text-sm font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-red-600" /> DEADLINE
                    </span>
                    <span className="text-red-600 text-sm font-medium">
                      {projectData.deadline}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <span className="text-gray-700 text-sm font-medium flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-600" /> CREATED BY
                    </span>
                    <span className="font-medium text-gray-800 text-sm">
                      {projectData.createdBy}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
                    <span className="text-gray-700 text-sm font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" /> CREATED
                      AT
                    </span>
                    <span className="font-medium text-gray-800 text-sm">
                      {projectData.createdAt}
                    </span>
                  </div>

                  <div className="pt-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
                    <div className="text-indigo-800 text-sm font-bold mb-4 flex items-center">
                      <Building className="w-4 h-4 mr-2 text-indigo-700" />{" "}
                      CLIENT DETAILS
                    </div>
                    <div className="pl-4 border-l-2 border-indigo-300 space-y-3">
                      <div className="text-gray-700 text-sm flex items-center">
                        <User className="w-4 h-4 mr-2 text-indigo-600" />
                        <span className="font-medium">
                          {projectData.clientName}
                        </span>
                      </div>
                      <div className="text-gray-700 text-sm flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-indigo-600" />
                        <a
                          href={`tel:${projectData.clientPhone}`}
                          className="hover:text-blue-600 transition-colors duration-200"
                        >
                          {projectData.clientPhone}
                        </a>
                      </div>
                      <div className="text-gray-700 text-sm flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-indigo-600" />
                        <a
                          href={`mailto:${projectData.clientEmail}`}
                          className="hover:text-blue-600 transition-colors duration-200"
                        >
                          {projectData.clientEmail.toLowerCase()}
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-blue-100 flex justify-center">
                      <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors duration-200 flex items-center">
                        <Phone className="w-4 h-4 mr-1" /> Contact Client
                      </button>
                    </div>
                  </div>

                  {/* Download button */}
                  <button className="w-full mt-4 text-gray-600 flex items-center justify-center py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                    <Download className="w-4 h-4 mr-2" /> Download Project
                    Details
                  </button>
                </div>
              </div>

              <div className="lg:w-2/3">
                {/* Task Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  <NavLink
                    to="/taskmangementpage"
                    className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-b-4 border-blue-500 group"
                  >
                    <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {projectData.stats.totalTasks}
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Tasks
                    </div>
                  </NavLink>

                  <NavLink
                    to="/taskmangementpage"
                    className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-b-4 border-indigo-500 group"
                  >
                    <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors duration-300">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {projectData.stats.totalMembers}
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team Members
                    </div>
                  </NavLink>

                  <NavLink
                    to="/taskmangementpage"
                    className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-b-4 border-green-500 group"
                  >
                    <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors duration-300">
                      <PlayCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {projectData.stats.activeTasks}
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Active Tasks
                    </div>
                  </NavLink>

                  <NavLink
                    to="/taskmangementpage"
                    className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-b-4 border-cyan-500 group"
                  >
                    <div className="bg-cyan-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-100 transition-colors duration-300">
                      <Zap className="w-6 h-6 text-cyan-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {projectData.stats.freshTasks}
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fresh Tasks
                    </div>
                  </NavLink>

                  <NavLink
                    to="/taskmangementpage"
                    className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-b-4 border-emerald-500 group"
                  >
                    <div className="bg-emerald-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-100 transition-colors duration-300">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {projectData.stats.completedTasks}
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completed
                    </div>
                  </NavLink>

                  <NavLink
                    to="/taskmangementpage"
                    className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-b-4 border-gray-400 group"
                  >
                    <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors duration-300">
                      <AlertTriangle className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">
                      {projectData.stats.inactiveTasks}
                    </div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inactive
                    </div>
                  </NavLink>

                  <NavLink
                    to="/taskmangementpage"
                    className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-b-4 border-red-500 group col-span-2"
                  >
                    <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-100 transition-colors duration-300">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      {projectData.stats.overdueTasks}
                    </div>
                    <div className="text-xs font-medium text-red-500 uppercase tracking-wider">
                      Overdue Tasks
                    </div>
                  </NavLink>
                </div>

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
                <div className="w-full mt-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">
                        Task Management
                      </h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left bg-blue-500 border-b border-gray-100">
                            <th className="py-3 px-4 font-medium text-white text-sm">
                              Task Name
                            </th>
                            <th className="py-3 px-4 font-medium text-white text-sm">
                              Hours
                            </th>
                            <th className="py-3 px-4 font-medium text-white text-sm">
                              Priority
                            </th>
                            <th className="py-3 px-4 font-medium text-white text-sm">
                              Assigned To
                            </th>
                            <th className="py-3 px-4 font-medium text-white text-sm">
                              Status
                            </th>
                            <th className="py-3 px-4 font-medium text-white text-sm">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tasks.map((task) => (
                            <tr
                              key={task.sr}
                              className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 shadow-md"
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="bg-indigo-200 p-2 rounded-lg mr-3">
                                    {getStatusIcon(task.status)}
                                  </div>
                                  <div>
                                    <NavLink
                                      to="/taskdetailpage"
                                      className="font-medium text-gray-800"
                                    >
                                      {task.name}
                                    </NavLink>
                                    <div className="text-xs text-gray-500">
                                      {task.category1}, {task.category2}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-gray-700">24</td>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    task.status === "FRESH"
                                      ? "bg-blue-100 text-blue-800"
                                      : task.status === "IN PROGRESS"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {task.status === "FRESH"
                                    ? "Medium"
                                    : task.status === "IN PROGRESS"
                                    ? "High"
                                    : "Low"}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-gray-800 font-medium">
                                  {task.assignedTo}
                                </div>
                              </td>

                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    task.status
                                  )}`}
                                >
                                  {task.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex space-x-3">
                                  <button className="p-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                                    <Edit className="w-4 h-4 text-blue-600" />
                                  </button>
                                  <button className="p-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200">
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {tasks.map((task) => (
                            <tr
                              key={task.sr}
                              className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 shadow-md"
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                    {getStatusIcon(task.status)}
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-800">
                                      {task.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {task.category1}, {task.category2}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4 text-gray-700">24</td>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    task.status === "FRESH"
                                      ? "bg-blue-100 text-blue-800"
                                      : task.status === "IN PROGRESS"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {task.status === "FRESH"
                                    ? "Medium"
                                    : task.status === "IN PROGRESS"
                                    ? "High"
                                    : "Low"}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-gray-800 font-medium">
                                  {task.assignedTo}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    task.status
                                  )}`}
                                >
                                  {task.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex space-x-3">
                                  <button className="p-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                                    <Edit className="w-4 h-4 text-blue-600" />
                                  </button>
                                  <button className="p-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200">
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
