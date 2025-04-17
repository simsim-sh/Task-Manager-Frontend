import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Import useParams
import { Clock, AlertCircle } from "lucide-react";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { getTasksByTitle } from "../api/service"; // ✅ Correct API import

const cleanTasks = (tasks) =>
  tasks.map((task) => ({
    ...task,
    activity: task.activity || { created: "N/A", updated: null },
  }));

const TaskTable = () => {
  const { title } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("simran title from url:", title);
  useEffect(() => {
    if (title) {
      fetchTasksByProjectTitle(title); // Trigger fetching tasks
    }
  }, [title]);

  const fetchTasksByProjectTitle = async (title) => {
    console.log("Fetching tasks for project title:", title); // Log the title
    setLoading(true);
    try {
      const result = await getTasksByTitle(title);
      console.log("API Response after await:", result); // Check what is returned from API
      if (result.success) {
        const cleaned = cleanTasks(result.data);
        setTasks(cleaned);
        setError(null);
      } else {
        setTasks([]);
        setError(result.message);
      }
    } catch (err) {
      setTasks([]);
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", err); // Log error details
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-blue-100 text-blue-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-purple-100 text-purple-800";
      case "Fresh":
        return "bg-blue-100 text-blue-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded flex items-center">
          <AlertCircle className="mr-2 h-5 w-5" />
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-3 px-4 text-left w-6"></th>
                <th className="py-3 px-4 text-left">Task Name</th>
                <th className="py-3 px-4 text-left">Hours</th>
                <th className="py-3 px-4 text-left">Priority</th>
                <th className="py-3 px-4 text-left">Assigned To</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Activity</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr
                    key={task._id || task.title} // Use _id if available
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="w-4 h-4 rounded-full bg-blue-200"></div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{task.name}</div>
                      <div className="text-gray-500 text-sm">{task.title}</div>
                    </td>
                    <td className="py-3 px-4">{task.hours}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">{task.assignedTo}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          Created: {task.activity?.created || "N/A"}
                        </div>
                        {task.activity?.updated && (
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            Updated: {task.activity.updated}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-700">
                          <TbEdit className="h-5 w-5" />
                        </button>
                        <button className="text-red-500 hover:text-red-700">
                          <MdOutlineDeleteSweep className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-6 text-center text-gray-500">
                    No tasks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
