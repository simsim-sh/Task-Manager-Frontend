import {
  Activity,
  Clock,
  Phone,
  Mail,
  Building,
  Calendar,
  BarChart,
  Download,
  Bookmark,
  Layers,
  Star,
  Tag,
  User,
} from "lucide-react";
import React from "react";
import smart from "../assets/images/smart.jpeg";

const projectCard = ({ projectData }) => {
  // Progress calculation
  const progressPercentage =
    (projectData?.stats?.completedTasks / projectData?.stats?.totalTasks) * 100;

  console.log("projectData", projectData);

  return (
    <div className="bg-white rounded-2xl shadow-2xl  lg:w-1/3 border border-blue-50 hover:shadow-xl transition-shadow duration-300">
      <div className="bg-gradient-to-r from-indigo-400 to-purple-200 p-8">
        <div className="flex justify-between items-center mb-6">
          <span
            className={`bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full flex items-center ${
              projectData?.status === "RUNNING"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            <Activity className="w-3 h-3 mr-1.5" /> {projectData?.status}
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
            {projectData?.name}
          </h2>
          <div className="text-xs text-gray-500 mb-3">Project #SR-2025</div>

          {/* Project Priority */}
          <div className="flex items-center bg-red-50 px-3 py-1.5 rounded-full">
            <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
            <span className="text-xs font-medium text-red-700">
              {projectData?.priority} Priority
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
              {progressPercentage?.toFixed(0)}%
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
            {projectData?.category}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
          <span className="text-gray-700 text-sm font-medium flex items-center">
            <Layers className="w-4 h-4 mr-2 text-blue-600" /> SUB CATEGORY
          </span>
          <span className="font-medium text-gray-800 text-sm">
            {projectData?.subCategory}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
          <span className="text-gray-700 text-sm font-medium flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" /> START DATE
          </span>
          <span className="font-medium text-gray-800 text-sm">
            {projectData?.startDate}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
          <span className="text-gray-700 text-sm font-medium flex items-center">
            <Clock className="w-4 h-4 mr-2 text-red-600" /> DEADLINE
          </span>
          <span className="text-red-600 text-sm font-medium">
            {projectData?.deadline}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
          <span className="text-gray-700 text-sm font-medium flex items-center">
            <User className="w-4 h-4 mr-2 text-blue-600" /> CREATED BY
          </span>
          <span className="font-medium text-gray-800 text-sm">
            {projectData?.createdBy}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-gray-100 hover:bg-gray-50 p-2 rounded transition-colors duration-200">
          <span className="text-gray-700 text-sm font-medium flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-600" /> CREATED AT
          </span>
          <span className="font-medium text-gray-800 text-sm">
            {projectData?.createdAt}
          </span>
        </div>

        <div className="pt-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
          <div className="text-indigo-800 text-sm font-bold mb-4 flex items-center">
            <Building className="w-4 h-4 mr-2 text-indigo-700" /> CLIENT DETAILS
          </div>
          <div className="pl-4 border-l-2 border-indigo-300 space-y-3">
            <div className="text-gray-700 text-sm flex items-center">
              <User className="w-4 h-4 mr-2 text-indigo-600" />
              <span className="font-medium">{projectData?.clientName}</span>
            </div>
            <div className="text-gray-700 text-sm flex items-center">
              <Phone className="w-4 h-4 mr-2 text-indigo-600" />
              <a
                href={`tel:${projectData?.clientPhone}`}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {projectData?.clientPhone}
              </a>
            </div>
            <div className="text-gray-700 text-sm flex items-center">
              <Mail className="w-4 h-4 mr-2 text-indigo-600" />
              <a
                href={`mailto:${projectData?.clientEmail}`}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {projectData?.clientEmail.toLowerCase()}
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
          <Download className="w-4 h-4 mr-2" /> Download Project Details
        </button>
      </div>
    </div>
  );
};

export default projectCard;
