import React from "react";
import {
  Calendar,
  Clock,
  User,
  Building,
  Phone,
  Mail,
  Download,
  Tag,
  Layers,
  Star,
  Flag,
  BarChart4,
  CircleCheck,
  CircleAlert,
} from "lucide-react";
import smart from "../assets/images/smart.jpeg";

const ProjectCard = ({ projectData }) => {
  // Calculate progress percentage
  const progressPercentage = projectData?.stats
    ? (projectData.stats.completedTasks / projectData.stats.totalTasks) * 100
    : 0;

  // Status indicator component
  const StatusIndicator = () => {
    const isRunning = projectData?.status === "RUNNING";
    return (
      <div
        className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium
        ${
          isRunning
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {isRunning ? (
          <CircleCheck className="w-3 h-3 mr-1.5" />
        ) : (
          <CircleAlert className="w-3 h-3 mr-1.5" />
        )}
        {projectData?.status}
      </div>
    );
  };

  // Priority badge component
  const PriorityBadge = () => {
    return (
      <div className="flex items-center bg-red-50 px-3 py-1.5 rounded-full">
        <Flag className="w-3 h-3 mr-1.5 text-red-500" />
        <span className="text-xs font-medium text-red-700">
          {projectData?.priority} Priority
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100  hover:shadow-xl transition-all duration-300">
      {/* Header Section */}
      <div className="relative">
        {/* Gradient header background */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-32"></div>

        {/* Avatar and status overlay */}
        <div className="absolute inset-x-0 top-16 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden">
            <img
              src={smart}
              alt="Project"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Project title and badges section */}
      <div className="mt-16 px-6 pt-2 text-center">
        <h2 className="text-xl font-bold text-gray-800">{projectData?.name}</h2>
        <p className="text-xs text-gray-500 mb-3">Project #SR-2025</p>

        <div className="flex justify-center space-x-2 mb-4">
          <StatusIndicator />
          <PriorityBadge />
        </div>

        {/* Favorites and bookmark buttons */}
        <div className="flex justify-center mb-4 space-x-4">
          <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
            <Star className="w-4 h-4 mr-1.5 text-yellow-400" />
            Favorite
          </button>
          <div className="h-4 border-r border-gray-200"></div>
          <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
            <Tag className="w-4 h-4 mr-1.5 text-blue-400" />
            Tag
          </button>
        </div>
      </div>

      {/* Progress section */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 flex items-center">
            <BarChart4 className="w-4 h-4 mr-1.5 text-blue-600" />
            Project Completion
          </span>
          <span className="text-sm font-bold text-blue-600">
            {progressPercentage.toFixed(0)}%
          </span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Project details section */}
      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-1">
          <div className="text-xs uppercase text-gray-500 font-medium mb-1">
            Category
          </div>
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium">{projectData?.category}</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs uppercase text-gray-500 font-medium mb-1">
            Sub Category
          </div>
          <div className="flex items-center">
            <Layers className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium">
              {projectData?.subCategory}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs uppercase text-gray-500 font-medium mb-1">
            Created By
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium">
              {projectData?.createdBy}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs uppercase text-gray-500 font-medium mb-1">
            Start Date
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium">
              {projectData?.startDate}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs uppercase text-gray-500 font-medium mb-1">
            Deadline
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-red-600" />
            <span className="text-sm font-medium text-red-600">
              {projectData?.deadline}
            </span>
          </div>
        </div>
      </div>

      {/* Client details section */}
      <div className="px-6 pb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center">
            <Building className="w-4 h-4 mr-2" />
            Client Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="ml-3 text-sm font-medium">
                {projectData?.clientName}
              </span>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <a
                href={`tel:${projectData?.clientPhone}`}
                className="ml-3 text-sm hover:text-blue-600 transition-colors"
              >
                {projectData?.clientPhone}
              </a>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <a
                href={`mailto:${projectData?.clientEmail}`}
                className="ml-3 text-sm hover:text-blue-600 transition-colors"
              >
                {projectData?.clientEmail?.toLowerCase()}
              </a>
            </div>
          </div>

          <button className="mt-4 w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Phone className="w-4 h-4 mr-2" />
            Contact Client
          </button>
        </div>
      </div>

      {/* Footer with download button */}
      <div className="px-6 pb-6">
        <button className="w-full py-2.5 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
          <Download className="w-4 h-4 mr-2" />
          Download Project Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
