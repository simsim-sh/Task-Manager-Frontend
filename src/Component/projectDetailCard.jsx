import React, { useEffect, useState } from "react";
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
import { FaUsers } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getProjectById } from "../api/service";

export default function ProjectCard() {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectById(projectId);
        // console.log("first", response);
        setProjectData(response.data.data);
      } catch (err) {
        console.error("Error fetching project:", err); // <--- Important
        setError("Error fetching project data");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  console.log("first", projectData); // <--- Important

  if (error || !projectData) {
    return (
      <div className="p-6 text-center text-red-500">
        {error || "No project data found."}
      </div>
    );
  }

  // Calculate progress with null checks
  const completedTasks = projectData?.stats?.completedTasks || 0;
  const totalTasks = projectData?.stats?.totalTasks || 1; // Prevent division by zero
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 h-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Replaced arbitrary URL with simpler background */}
          <div className="absolute inset-0 bg-blue-300 bg-center mix-blend-overlay"></div>
        </div>
        <div className="flex justify-between items-start p-4">
          <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-white text-xs font-medium border border-white/30">
            Project #{projectData?.projectCode || "SR-2025"}
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

      {/* company name */}
      <div className="relative px-6 pb-4" style={{ marginTop: "-2.5rem" }}>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {projectData.title
              ? projectData.title.slice(0, 2).toUpperCase()
              : "PR"}
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-800 text-center">
            {projectData.title || "Project Name"}
          </h2>

          <div className="flex mt-3 space-x-2">
            <div
              className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                projectData.status === "RUNNING"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {projectData.status === "RUNNING" ? (
                <CircleCheck className="w-3 h-3 mr-1" />
              ) : (
                <CircleAlert className="w-3 h-3 mr-1" />
              )}
              {projectData.status || "PENDING"}
            </div>

            <div className="flex items-center bg-red-50 px-3 py-1 rounded-full">
              <Flag className="w-3 h-3 mr-1 text-red-500" />
              <span className="text-xs font-semibold text-red-700">
                {projectData.priority || "Medium"} Priority
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* project completion  */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 flex items-center">
            <BarChart4 className="w-4 h-4 mr-1 text-blue-600" />
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
          <span>{completedTasks} completed</span>
          <span>{totalTasks - completedTasks} remaining</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
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
                    {projectData.category || "General"}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaUsers className="w-4 h-4 text-purple-600" />
                </div>
                <div className="ml-3">
                  <div className="text-xs text-gray-500 font-medium">
                    Assigned To
                  </div>
                  <div className="text-sm font-medium">
                    {projectData.assignedTo || "None"}
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
                {projectData.createdBy || "Unknown"}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-gray-500 font-medium">Start Date</div>
            <div className="flex items-center p-2 bg-gray-50 rounded-lg">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium">
                {new Date(projectData.createdAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }) || "Not set"}
              </span>
            </div>
          </div>

          <div className="col-span-2 space-y-1">
            <div className="text-xs text-gray-500 font-medium">Deadline</div>
            <div className="flex items-center p-2 bg-red-50 rounded-lg">
              <Clock className="w-4 h-4 mr-2 text-red-600" />
              <span className="text-sm font-medium text-red-600">
                {projectData.deadline || "Not set"}
              </span>
            </div>
          </div>
        </div>

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
                {projectData.contactPerson || "No client name"}
              </span>
            </div>

            {projectData.contactPhone && (
              <div className="flex items-center bg-white rounded-lg p-2 shadow-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <a
                  href={`tel:${projectData.contactPhone}`}
                  className="ml-3 text-sm hover:text-blue-600 transition-colors"
                >
                  {projectData.contactPhone}
                </a>
              </div>
            )}

            {projectData.contactEmail && (
              <div className="flex items-center bg-white rounded-lg p-2 shadow-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <a
                  href={`mailto:${projectData.contactEmail}`}
                  className="ml-3 text-sm hover:text-blue-600 transition-colors"
                >
                  {projectData.contactEmail.toLowerCase()}
                </a>
              </div>
            )}
          </div>

          <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all flex items-center justify-center shadow-md">
            <Phone className="w-4 h-4 mr-2" />
            Contact Client
          </button>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between space-x-3">
          <span className="text-xs text-gray-500">
            {projectData.updatedAt
              ? new Date(projectData.updatedAt).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Not updated"}
          </span>
        </div>
      </div>
    </div>
  );
}
