import { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { getTasksByTitle, getAllTasks } from "../api/service";

// Function to clean tasks data
const cleanTasks = (tasks) =>
  tasks.map((task) => ({
    ...task,
    activity: task.activity || { created: "N/A", updated: null },
  }));

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  // Fetch tasks whenever searchTitle changes
  useEffect(() => {
    if (searchTitle.trim()) {
      searchTasks(searchTitle); // Search tasks
    } else {
      fetchAllTasks(); // Fetch all tasks if no search term
    }
  }, [searchTitle]);

  const fetchAllTasks = async () => {
    setLoading(true);
    try {
      const result = await getAllTasks();
      if (result.success !== false) {
        const cleaned = cleanTasks(result.data || result);
        setTasks(cleaned);
        setError(null);
      } else {
        setTasks([]); // No tasks found, empty array
        setError(result.message);
      }
    } catch (err) {
      setTasks([]); // On error, set empty array
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const searchTasks = async (title) => {
    setLoading(true);
    try {
      const result = await getTasksByTitle(title);
      if (result.success !== false) {
        const cleaned = cleanTasks(result.data || result);
        setTasks(cleaned);
        setError(null);
      } else {
        setTasks([]); // No tasks found for search term
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to search tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTitle.trim()) {
      searchTasks(searchTitle);
    } else {
      fetchAllTasks();
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
      {/* Search form */}
      <div className="mb-4 p-4 bg-white rounded shadow">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Search by task title..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Search
          </button>
          {searchTitle && (
            <button
              type="button"
              onClick={() => {
                setSearchTitle("");
                fetchAllTasks();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded flex items-center">
          <AlertCircle className="mr-2 h-5 w-5" />
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        // Table with tasks
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
                    key={task.title}
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
                    No tasks found. Try a different search term.
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
