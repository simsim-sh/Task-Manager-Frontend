import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Building,
  Phone,
  Mail,
  Tag,
  Star,
  Flag,
  BarChart4,
  CircleCheck,
  CircleAlert,
  MapPin,
  FileText,
  Users,
  MessageSquare,
  Paperclip,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  Edit,
  Sparkles,
  Check,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../api/service";
import UserActivityTimeline from "../pages/ProjectActivity";
import TaskTable from "../pages/TaskTable";
import AddProjects from "../Component/addProjectpopup";

export default function ProjectCard() {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showClientDetails, setShowClientDetails] = useState(true);
  const [showNotes, setShowNotes] = useState(true);

  // Added for edit functionality - taken from ProjectDashboardFile
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await getProjectById(projectId);
        setProjectData(response.data.data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Error fetching project data");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, shouldRefresh]);

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-300 border-l-blue-300 border-r-blue-300 rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-600 font-medium">
          Loading project details...
        </p>
      </div>
    );
  }

  if (error || !projectData) {
    return (
      <div className="p-16 text-center bg-red-50 rounded-xl border border-red-200 shadow-lg">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <CircleAlert className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-red-700">
          Unable to Load Project
        </h3>
        <p className="mt-2 text-red-600">{error || "No project data found."}</p>
        <button className="mt-4 px-4 py-2 bg-white border border-red-300 rounded-full text-red-600 hover:bg-red-50 transition-all">
          Try Again
        </button>
      </div>
    );
  }

  // Calculate progress with null checks
  const completedTasks = projectData?.stats?.completedTasks || 0;
  const totalTasks = projectData?.stats?.totalTasks || 1;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status color based on project status
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "running":
      case "fresh":
        return "bg-gradient-to-r from-emerald-400 to-green-500 text-white";
      case "in progress":
        return "bg-gradient-to-r from-blue-400 to-indigo-500 text-white";
      case "completed":
        return "bg-gradient-to-r from-teal-400 to-cyan-500 text-white";
      case "on hold":
      case "hold":
        return "bg-gradient-to-r from-amber-400 to-yellow-500 text-white";
      case "cancelled":
      case "active":
        return "bg-gradient-to-r from-red-400 to-rose-500 text-white";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
    }
  };

  // Get priority badge styling
  const getPriorityStyle = (priority) => {
    const priorityLower = priority?.toLowerCase() || "medium";
    switch (priorityLower) {
      case "high":
        return "bg-gradient-to-r from-red-500 to-rose-600 text-white";
      case "medium":
        return "bg-gradient-to-r from-orange-500 to-amber-600 text-white";
      case "low":
        return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
    }
  };

  const getCategoryIcon = (category) => {
    const categoryLower = category?.toLowerCase() || "";
    if (categoryLower.includes("dev")) return "💻";
    if (categoryLower.includes("design")) return "🎨";
    if (categoryLower.includes("market")) return "📈";
    return "🔍";
  };

  // Added from ProjectDashboardFile - Handle open popup
  const openPopup = async (project) => {
    setShowPopup(true);
    setSelectedProject(project);
    // Fetch project details and ensure form fields are editable
    if (project?._id) {
      try {
        const projectByIDResponse = await getProjectById(project._id);
        if (projectByIDResponse?.success) {
          setSelectedProject(projectByIDResponse?.data);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    }
  };

  // Added from ProjectDashboardFile - Handle close popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedProject(null);
    if (shouldRefresh) {
      setShouldRefresh(false);
      // Re-fetch project data
      const fetchProject = async () => {
        try {
          setLoading(true);
          const response = await getProjectById(projectId);
          setProjectData(response.data.data);
        } catch (err) {
          console.error("Error fetching project:", err);
          setError("Error fetching project data");
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  };

  // Added from ProjectDashboardFile - Fetch data after update
  const fetchData = () => {
    setShouldRefresh(true);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 h-40 relative overflow-hidden">
          <div className="flex justify-between items-start p-6">
            {/* <div className="bg-white/30 backdrop-blur-md rounded-full px-4 py-2 text-white text-xs font-semibold shadow-lg border border-white/30">
              Project #{projectData?.projectCode || "SR-2025"}
            </div> */}
            <div className="flex justify-end space-x-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all">
                <Star className="w-4 h-4" />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 transition-all"
                onClick={() => openPopup(projectData)}
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Project overview */}
        <div className="relative px-8 pb-6" style={{ marginTop: "-3rem" }}>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-3xl font-bold">
              {projectData.title
                ? projectData.title.slice(0, 2).toUpperCase()
                : "PR"}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800 text-center">
              {projectData.title || "Project Name"}
            </h2>

            <div className="flex flex-wrap mt-4 gap-2 justify-center">
              <div
                className={`flex items-center px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(
                  projectData.status
                )}`}
              >
                {["running", "completed", "active", "fresh"].includes(
                  projectData.status?.toLowerCase()
                ) ? (
                  <CircleCheck className="w-3.5 h-3.5 mr-1.5" />
                ) : (
                  <CircleAlert className="w-3.5 h-3.5 mr-1.5" />
                )}
                {projectData.status || "PENDING"}
              </div>

              <div
                className={`flex items-center px-4 py-1.5 rounded-full shadow-sm ${getPriorityStyle(
                  projectData.priority
                )}`}
              >
                <Flag className="w-3.5 h-3.5 mr-1.5" />
                <span className="text-xs font-semibold">
                  {projectData.priority || "Medium"} Priority
                </span>
              </div>

              {projectData.category && (
                <div className="flex items-center px-4 py-1.5 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full shadow-sm">
                  <span className="mr-1.5">
                    {getCategoryIcon(projectData.category)}
                  </span>
                  <span className="text-xs font-semibold">
                    {projectData.category}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        {projectData.description && (
          <div className="px-8 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-b border-blue-100">
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              <span className="text-sm font-semibold text-blue-800">
                Project Description
              </span>
            </div>
            <p className="text-sm text-gray-700 bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
              {projectData.description}
            </p>
          </div>
        )}

        {/* project completion */}
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-700 flex items-center">
              <BarChart4 className="w-5 h-5 mr-2 text-blue-600" />
              Project Progress
            </span>
            <span className="text-sm font-bold text-blue-600 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
              {progressPercentage.toFixed(0)}% Complete
            </span>
          </div>
          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{completedTasks} tasks completed</span>
            <span>{totalTasks - completedTasks} tasks remaining</span>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Key Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    Created By
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    {projectData.createdBy || "Unknown"}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    Created On
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    {formatDate(projectData.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    Assigned To
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    {projectData.assignedTo || "Unassigned"}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                    Deadline
                  </div>
                  <div className="text-sm font-medium text-red-600">
                    {projectData.deadline || "Not set"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes Section - Collapsible */}
          {projectData.notes && (
            <div className="bg-white rounded-xl border border-purple-200 shadow-sm overflow-hidden transition-all duration-300">
              <div
                className="bg-gradient-to-r from-purple-50 to-indigo-50 px-5 py-3 flex justify-between items-center cursor-pointer"
                onClick={() => setShowNotes(!showNotes)}
              >
                <h3 className="text-sm font-bold text-purple-800 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Additional Notes
                </h3>
                <button className="text-purple-500 hover:bg-purple-100 rounded-full p-1">
                  {showNotes ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              {showNotes && (
                <div className="px-5 py-4 bg-white border-t border-purple-100">
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <p className="text-sm text-gray-700">{projectData.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Client Information - Collapsible */}
          <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden transition-all duration-300">
            <div
              className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-3 flex justify-between items-center cursor-pointer"
              onClick={() => setShowClientDetails(!showClientDetails)}
            >
              <h3 className="text-sm font-bold text-blue-800 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Client Information
              </h3>
              <button className="text-blue-500 hover:bg-blue-100 rounded-full p-1">
                {showClientDetails ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {showClientDetails && (
              <div className="p-5 bg-white border-t border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {projectData.companyName && (
                    <div className="flex items-center bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-xs text-gray-500 font-semibold">
                          Company
                        </div>
                        <div className="text-sm font-medium">
                          {projectData.companyName}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-xs text-gray-500 font-semibold">
                        Contact Person
                      </div>
                      <div className="text-sm font-medium">
                        {projectData.contactPerson || "No contact person"}
                      </div>
                    </div>
                  </div>

                  {projectData.contactPhone && (
                    <div className="flex items-center bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-xs text-gray-500 font-semibold">
                          Phone
                        </div>
                        <a
                          href={`tel:${projectData.contactPhone}`}
                          className="text-sm font-medium hover:text-blue-600 transition-colors"
                        >
                          {projectData.contactPhone}
                        </a>
                      </div>
                    </div>
                  )}

                  {projectData.contactEmail && (
                    <div className="flex items-center bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-100 hover:shadow-md transition-all">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-xs text-gray-500 font-semibold">
                          Email
                        </div>
                        <a
                          href={`mailto:${projectData.contactEmail}`}
                          className="text-sm font-medium hover:text-blue-600 transition-colors"
                        >
                          {projectData.contactEmail.toLowerCase()}
                        </a>
                      </div>
                    </div>
                  )}

                  {projectData.address && (
                    <div className="flex items-center bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-100 hover:shadow-md transition-all col-span-1 md:col-span-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-xs text-gray-500 font-semibold">
                          Address
                        </div>
                        <div className="text-sm">{projectData.address}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex mt-4 gap-2">
                  <button className="flex-1 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all flex items-center justify-center shadow-md">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Client
                  </button>
                  <button className="px-4 py-2.5 bg-white border border-blue-300 text-blue-600 text-sm font-medium rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center shadow-sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
              Last Updated: {formatDate(projectData.updatedAt)}
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-xs font-medium hover:opacity-90 transition-all flex items-center"
                onClick={() => openPopup(projectData)}
              >
                <Edit className="w-3.5 h-3.5 mr-1.5" />
                Edit Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
          <h3 className="text-white font-bold flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Project Activity Timeline
          </h3>
        </div>
        <div className="p-4">
          <UserActivityTimeline projectTitle={projectData?.title} />
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
          <h3 className="text-white font-bold flex items-center">
            <Check className="w-5 h-5 mr-2" />
            Project Tasks
          </h3>
        </div>
        <div className="p-4">
          <TaskTable projectTitle={projectData?.title} />
        </div>
      </div>

      {/* Popup Form - Added from ProjectDashboardFile */}
      {showPopup && (
        <AddProjects
          closePopup={closePopup}
          fetchData={fetchData}
          selectedProject={selectedProject}
        />
      )}
    </div>
  );
}
