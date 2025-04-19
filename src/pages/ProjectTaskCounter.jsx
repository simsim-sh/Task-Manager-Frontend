import { useState, useEffect } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { FiSun, FiPlayCircle, FiCheck, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { formatDate } from "../utlis/helper";

export default function ProjectTaskCounter({
  projectTitleTask,
  loading,
  totalTasks,
  NewTasks,
  holdTasks,
  inProgressTasks,
  activeTasks,
  setProjectTitleTask,
  setLoading,
  completedTasks,
}) {
  // const [projectTitleTask, setProjectTitleTask] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectStats, setProjectStats] = useState({
    totalTasks: 0,
    inProgress: 0,
    hold: 0,
    completed: 0,
  });
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Function to fetch tasks by title
  const fetchTasksByProjectTitle = async (projectTitle) => {
    setLoading(true);
    try {
      // This function reference is missing, you'll need to import or define it
      const response = await getTaskByTitle(projectTitle);
      console.log("API Response after await:", response.data);
      setProjectTitleTask(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Error fetching project data");
    } finally {
      setLoading(false);
    }
  };

  // Load all tasks (with auto-refresh functionality)
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTaskBytitle();

      if (!response.ok) {
        toast.error(response?.message || "Failed to fetch tasks");
      }

      const data = await response.json();

      setProjectStats({
        totalTasks: data.length,
        inProgress: data.filter((task) => task.status === "in_progress").length,
        hold: data.filter((task) => task.status === "on_hold").length,
        completed: data.filter((task) => task.status === "completed").length,
      });

      setLastRefresh(new Date());
    } catch (err) {
      setError(err.message);
      // console.error("Failed to load task data:", err);
      toast?.error?.("Error fetching tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Manual refresh handler
  const handleRefresh = () => {
    fetchTasks();
    toast?.success?.("Dashboard refreshed!");
  };

  // console.log("projectTitleTask", projectTitleTask);

  // Load initial data on component mount and set up polling
  useEffect(() => {
    // Initial fetch
    fetchTasks();

    // Set up a polling interval (every 30 seconds)
    const intervalId = setInterval(() => {
      fetchTasks();
    }, 30000);

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (projectTitle) {
      fetchTasksByProjectTitle(projectTitle);
    }
  }, [projectTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-700">Task Status</h2>
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-2">
            Last updated: {formatDate(projectTitleTask[0]?.updatedAt)}
          </span>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="p-1.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
            title="Refresh dashboard"
          >
            <FiRefreshCw
              className={`w-4 h-4 text-gray-600 ${
                loading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks */}
        <div className="relative overflow-hidden bg-white rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-blue-500 tracking-wider">
                  TOTAL TASKS
                </p>
                <h2 className="mt-2 text-xl font-extrabold text-gray-800">
                  {loading ? "..." : totalTasks}
                </h2>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <AiOutlineBarChart className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-blue-300 to-blue-500"></div>
        </div>

        {/* In Progress Tasks */}
        <div className="relative overflow-hidden bg-white rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-purple-500 tracking-wider">
                  IN PROGRESS
                </p>
                <h2 className="mt-2 text-xl font-extrabold text-gray-800">
                  {loading ? "..." : inProgressTasks}
                </h2>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiSun className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-purple-300 to-purple-500"></div>
        </div>

        {/* On Hold Tasks */}
        <div className="relative overflow-hidden bg-white rounded-xl shadow-md border-l-4 border-amber-500">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-amber-500 tracking-wider">
                  HOLD
                </p>
                <h2 className="mt-2 text-xl font-extrabold text-gray-800">
                  {loading ? "..." : holdTasks}
                </h2>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <FiPlayCircle className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-amber-300 to-amber-500"></div>
        </div>

        {/* Completed Tasks */}
        <div className="relative overflow-hidden bg-white rounded-xl shadow-md border-l-4 border-green-500">
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-green-500 tracking-wider">
                  COMPLETED
                </p>
                <h2 className="mt-2 text-xl font-extrabold text-gray-800">
                  {loading ? "..." : completedTasks}
                </h2>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiCheck className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-500"></div>
        </div>
      </div>

      {/* {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )} */}
    </div>
  );
}
