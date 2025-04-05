import {
  FileText,
  Users,
  PlayCircle,
  Zap,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const statusDashboard = ({ projectData }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      <NavLink
        to="/taskmangementpage"
        className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-b-4 border-blue-500 group"
      >
        <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-300">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div className="text-2xl font-bold text-gray-800 mb-1">
          {projectData?.stats?.totalTasks}
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
          {projectData?.stats?.totalMembers}
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
          {projectData?.stats?.activeTasks}
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
          {projectData?.stats?.freshTasks}
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
          {projectData?.stats?.completedTasks}
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
          {projectData?.stats?.inactiveTasks}
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
          {projectData?.stats?.overdueTasks}
        </div>
        <div className="text-xs font-medium text-red-500 uppercase tracking-wider">
          Overdue Tasks
        </div>
      </NavLink>
    </div>
  );
};

export default statusDashboard;
