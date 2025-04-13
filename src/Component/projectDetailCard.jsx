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
  ChevronRight,
} from "lucide-react";

export default function ProjectCard() {
  // Sample project data - in a real implementation, this would be passed as props
  const projectData = {
    name: "Smart Retail Analytics Platform",
    category: "Software Development",
    subCategory: "Data Analytics",
    createdBy: "Alex Johnson",
    startDate: "Mar 15, 2025",
    deadline: "May 30, 2025",
    status: "RUNNING",
    priority: "High",
    clientName: "Acme Retail Corporation",
    clientPhone: "+1 (555) 123-4567",
    clientEmail: "contact@acmeretail.com",
    stats: {
      completedTasks: 24,
      totalTasks: 40,
    },
  };

  // Calculate progress percentage
  const progressPercentage = projectData?.stats
    ? (projectData.stats.completedTasks / projectData.stats.totalTasks) * 100
    : 0;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 h-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/api/placeholder/800/400')] bg-center mix-blend-overlay"></div>
        </div>
        <div className="flex justify-between items-start p-4">
          <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5 text-white text-xs font-medium border border-white/30">
            Project #SR-2025
          </div>
          <div className="flex space-x-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all">
              <Star className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all">
              <Tag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Avatar and Project Title */}
      <div className="relative px-6 -mt-10 pb-4">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            SR
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-800 text-center">
            {projectData.name}
          </h2>

          <div className="flex mt-3 space-x-2">
            {/* Status indicator */}
            <div
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold
              ${
                projectData.status === "RUNNING"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {projectData.status === "RUNNING" ? (
                <CircleCheck className="w-3 h-3 mr-1.5" />
              ) : (
                <CircleAlert className="w-3 h-3 mr-1.5" />
              )}
              {projectData.status}
            </div>

            {/* Priority badge */}
            <div className="flex items-center bg-red-50 px-3 py-1.5 rounded-full">
              <Flag className="w-3 h-3 mr-1.5 text-red-500" />
              <span className="text-xs font-semibold text-red-700">
                {projectData.priority} Priority
              </span>
            </div>
          </div>
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
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{projectData.stats.completedTasks} completed</span>
          <span>
            {projectData.stats.totalTasks - projectData.stats.completedTasks}{" "}
            remaining
          </span>
        </div>
      </div>

      {/* Project details section */}
      <div className="p-6 space-y-6">
        {/* Main details grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Tag className="w-4 h-4 text-blue-600" />
                </div>
                <div className="ml-3">
                  <div className="text-xs text-gray-500 font-medium">
                    Category
                  </div>
                  <div className="text-sm font-medium">
                    {projectData.category}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Layers className="w-4 h-4 text-purple-600" />
                </div>
                <div className="ml-3">
                  <div className="text-xs text-gray-500 font-medium">
                    Sub Category
                  </div>
                  <div className="text-sm font-medium">
                    {projectData.subCategory}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-gray-500 font-medium">Created By</div>
            <div className="flex items-center p-2 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium">
                {projectData.createdBy}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-gray-500 font-medium">Start Date</div>
            <div className="flex items-center p-2 bg-gray-50 rounded-lg">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium">
                {projectData.startDate}
              </span>
            </div>
          </div>

          <div className="col-span-2 space-y-1">
            <div className="text-xs text-gray-500 font-medium">Deadline</div>
            <div className="flex items-center p-2 bg-red-50 rounded-lg">
              <Clock className="w-4 h-4 mr-2 text-red-600" />
              <span className="text-sm font-medium text-red-600">
                {projectData.deadline}
              </span>
            </div>
          </div>
        </div>

        {/* Client details section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <h3 className="text-sm font-bold text-blue-800 mb-4 flex items-center">
            <Building className="w-4 h-4 mr-2" />
            Client Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center bg-white rounded-lg p-2 shadow-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="ml-3 text-sm font-medium">
                {projectData.clientName}
              </span>
            </div>

            <div className="flex items-center bg-white rounded-lg p-2 shadow-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <a
                href={`tel:${projectData.clientPhone}`}
                className="ml-3 text-sm hover:text-blue-600 transition-colors"
              >
                {projectData.clientPhone}
              </a>
            </div>

            <div className="flex items-center bg-white rounded-lg p-2 shadow-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <a
                href={`mailto:${projectData.clientEmail}`}
                className="ml-3 text-sm hover:text-blue-600 transition-colors"
              >
                {projectData.clientEmail.toLowerCase()}
              </a>
            </div>
          </div>

          <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center shadow-md">
            <Phone className="w-4 h-4 mr-2" />
            Contact Client
          </button>
        </div>
      </div>

      {/* Footer with download button */}
      <div className="px-6 pb-6">
        <button className="w-full py-3 flex items-center justify-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium shadow-sm">
          <Download className="w-4 h-4 mr-2" />
          Download Project Details
        </button>
      </div>
    </div>
  );
}
