import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createTask, getAllProject } from "../api/service";
import {
  TbLayoutGridAdd,
  TbClockHour4,
  TbFlag,
  TbUserCircle,
  TbStatusChange,
  TbNotes,
  TbAlertCircle,
  TbInfoCircle,
} from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

const TaskForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    taskName: "",
    title: "",
    hours: "",
    priority: "",
    assignedToWork: "",
    status: "",
    description: "",
    onHoldReason: "",
    onHoldDescription: "",
  });

  const [projects, setProjects] = useState([]);

  const predefinedUsers = [
    "Simran",
    "Sunny",
    "Kashish",
    "Ankit",
    "Chotu",
    "Anshu",
    "Kajju",
    "Adarsh Singh",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { taskName, title, hours, priority, assignedToWork, status } =
      formData;

    if (
      !taskName ||
      !title ||
      !hours ||
      !priority ||
      !assignedToWork ||
      !status
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (formData.status === "hold") {
      if (!formData.onHoldReason || !formData.onHoldDescription) {
        toast.error("Please provide reason and description for Hold status.");
        return;
      }
    }

    try {
      setLoading(true);
      const response = await createTask(formData);

      if (response?.success) {
        toast.success("Task created successfully!");
        navigate("/taskmanagement");
      } else {
        toast.error(response?.message || "Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Server error! Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProject();
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-orange-500";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="rounded-xl overflow-hidden">
      <div className="relative py-5 px-6">
        <h2 className="text-xl font-bold text-black relative z-10 flex items-center">
          <span className="mr-3 bg-orange-500 text-white p-2 rounded-full">
            <TbLayoutGridAdd size={20} />
          </span>
          Create New Task
        </h2>
      </div>

      <div className="p-6 bg-white">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Name Field */}
          <div className="relative">
            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-blue-700 flex items-center">
              <TbInfoCircle className="mr-1 text-orange-500" />
              Task Name*
            </label>
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleChange}
              required
              className="w-full border-2 border-blue-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-colors"
              placeholder="Enter task name..."
            />
          </div>

          {/* Project Dropdown */}
          <div className="relative">
            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-blue-700 flex items-center">
              <TbInfoCircle className="mr-1 text-orange-500" />
              Project*
            </label>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border-2 border-blue-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-colors"
            >
              <option value="">-- Select Project --</option>
              {projects.map((project) => (
                <option key={project._id} value={project.title}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Hours */}
            <div className="relative">
              <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-blue-700 flex items-center">
                <TbClockHour4 className="mr-1 text-orange-500" />
                Hours*
              </label>
              <input
                type="number"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                required
                className="w-full border-2 border-blue-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-colors"
              />
            </div>

            {/* Priority */}
            <div className="relative">
              <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-blue-700 flex items-center">
                <TbFlag className="mr-1 text-orange-500" />
                Priority*
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                className={`w-full border-2 border-blue-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-colors ${
                  formData.priority ? getPriorityColor(formData.priority) : ""
                }`}
              >
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div className="relative">
              <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-blue-700 flex items-center">
                <TbStatusChange className="mr-1 text-orange-500" />
                Status*
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full border-2 border-blue-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-colors"
              >
                <option value="">Select</option>
                <option value="Fresh">Fresh</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="hold">Hold</option>
              </select>

              {formData.status === "hold" && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="relative mb-3">
                    <label className="absolute -top-3 left-4 bg-orange-50 px-2 text-sm font-medium text-blue-700 flex items-center">
                      <TbAlertCircle className="mr-1 text-orange-500" />
                      Hold Reason
                    </label>
                    <select
                      name="onHoldReason"
                      value={formData.onHoldReason}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-orange-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-colors"
                    >
                      <option value="">Select reason</option>
                      <option value="Dependency on other task">
                        Dependency on other task
                      </option>
                      <option value="Client Delay">Client Delay</option>
                      <option value="Resource Unavailable">
                        Resource Unavailable
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className="absolute -top-3 left-4 bg-orange-50 px-2 text-sm font-medium text-blue-700 flex items-center">
                      <TbNotes className="mr-1 text-orange-500" />
                      Hold Description
                    </label>
                    <textarea
                      name="onHoldDescription"
                      value={formData.onHoldDescription}
                      onChange={handleChange}
                      rows="2"
                      required
                      className="w-full border-2 border-orange-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-colors"
                      placeholder="Explain the reason for holding this task..."
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            {/* Assigned To */}
            <div className="relative">
              <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-blue-700 flex items-center">
                <TbUserCircle className="mr-1 text-orange-500" />
                Assigned To*
              </label>
              <select
                name="assignedToWork"
                value={formData.assignedToWork}
                onChange={handleChange}
                required
                className="w-full border-2 border-blue-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-colors"
              >
                <option value="">Select User</option>
                {predefinedUsers.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="relative">
            <label className="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-blue-700 flex items-center">
              <TbNotes className="mr-1 text-orange-500" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border-2 border-blue-300 p-3 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white transition-colors"
              placeholder="Enter task description here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 text-white font-bold text-lg rounded-lg relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform"
              style={{
                background: "linear-gradient(90deg, #f97316 0%, #fb923c 100%)",
                boxShadow: "0 10px 15px -3px rgba(249, 115, 22, 0.4)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Task...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <FaPlus className="h-5 w-5 mr-2" />
                  Create Task
                </span>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500"></div>
    </div>
  );
};

export default TaskForm;
