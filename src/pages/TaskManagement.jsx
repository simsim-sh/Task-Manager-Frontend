import { getAllTasks } from "../api/service";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const TaskManagement = () => {
  const [allTask, setAllTask] = useState([]);
  const [tasks, setTasks] = useState([]);

  //api integration
  const fetchData = async () => {
    try {
      // setLoading(true);
      const getAllTaskResponse = await getAllTasks();
      if (getAllTaskResponse?.success) {
        return toast.message(getAllTaskResponse?.message);
      }
      setAllTask(getAllTaskResponse?.data);
      console.log("getAllTaskResponse", getAllTaskResponse?.data);
    } catch (error) {
      toast.error("Error fetching Task.");
    } finally {
      setLoading(false);
    }
  };

  // Status to icon mapping
  const getStatusIcon = (status) => {
    switch (status) {
      case "FRESH":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "IN PROGRESS":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "COMPLETED":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  // Status to color class mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "FRESH":
        return "bg-blue-100 text-blue-800";
      case "IN PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper functions to calculate statistics
  const calculateTotalMembers = (tasksData) => {
    const uniqueMembers = new Set();
    tasksData.forEach((task) => {
      if (task.assignedTo) {
        uniqueMembers.add(task.assignedTo);
      }
    });
    return uniqueMembers.size;
  };

  // Define what makes a task "fresh"
  const isTaskFresh = (task) => {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    return new Date(task.createdAt) > twentyFourHoursAgo;
  };

  // Check if task is overdue
  const isTaskOverdue = (task) => {
    return (
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== "completed"
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full mt-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Task Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-blue-500 border-b border-gray-100">
                <th className="py-3 px-4 font-medium text-white text-sm">
                  Task Name
                </th>
                <th className="py-3 px-4 font-medium text-white text-sm">
                  Hours
                </th>
                <th className="py-3 px-4 font-medium text-white text-sm">
                  Priority
                </th>
                <th className="py-3 px-4 font-medium text-white text-sm">
                  Assigned To
                </th>
                <th className="py-3 px-4 font-medium text-white text-sm">
                  Status
                </th>
                <th className="py-3 px-4 font-medium text-white text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allTask?.map((task) => (
                <tr
                  key={task.sr}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 shadow-md"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="bg-indigo-200 p-2 rounded-lg mr-3">
                        {getStatusIcon(task.status)}
                      </div>
                      <div>
                        <NavLink
                          to="/taskdetailpage"
                          className="font-medium text-gray-800"
                        >
                          {task.name}
                        </NavLink>
                        <div className="text-xs text-gray-500">
                          {task.category1}, {task.category2}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">24</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === "FRESH"
                          ? "bg-blue-100 text-blue-800"
                          : task.status === "IN PROGRESS"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.status === "FRESH"
                        ? "Medium"
                        : task.status === "IN PROGRESS"
                        ? "High"
                        : "Low"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-800 font-medium">
                      {task.assignedTo}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-3">
                      <button className="p-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {tasks.map((task) => (
                <tr
                  key={task.sr}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 shadow-md"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        {getStatusIcon(task.status)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {task.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {task.category1}, {task.category2}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">24</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.status === "FRESH"
                          ? "bg-blue-100 text-blue-800"
                          : task.status === "IN PROGRESS"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {task.status === "FRESH"
                        ? "Medium"
                        : task.status === "IN PROGRESS"
                        ? "High"
                        : "Low"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-800 font-medium">
                      {task.assignedTo}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-3">
                      <button className="p-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
