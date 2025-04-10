import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Trash2,
  Edit,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getAllTasks, deleteTaskByTitle } from "../api/service";
import Sidebar from "../Component/Sidebar";
import Header from "../Component/Header";
import StatusDashboard from "../Component/statusDashboard";
import TaskForm from "../pages/taskfrom";
import { TbHomeHeart } from "react-icons/tb";
import { TiChevronRight } from "react-icons/ti";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";

const TaskManagement = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();

      if (!response?.success) {
        toast.error(response?.message || "Failed to fetch tasks");
        return;
      }

      const sortedTasks = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAllTasks(sortedTasks);
      setTotalPages(Math.ceil(sortedTasks.length / tasksPerPage));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (title) => {
    try {
      setLoading(true);
      const response = await deleteTaskByTitle(title);

      if (response?.success) {
        toast.success("Task deleted successfully");
        setAllTasks(allTasks.filter((task) => task.title !== title));
        // Update total pages after deletion
        const updatedTasks = allTasks.filter((task) => task.title !== title);
        setTotalPages(Math.ceil(updatedTasks.length / tasksPerPage));
        // If current page is now empty and not the first page, go to previous page
        if (currentPage > 1 && indexOfFirstTask >= updatedTasks.length) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        toast.error(response?.message || "Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

  const openForm = () => {
    setShowForm(true);
    setTimeout(() => setFormVisible(true), 10); // trigger slide-in
  };

  const closeForm = () => {
    setFormVisible(false);
    setTimeout(() => setShowForm(false), 300); // match transition
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Update pagination when tasksPerPage changes
  useEffect(() => {
    setTotalPages(Math.ceil(allTasks.length / tasksPerPage));
  }, [allTasks, tasksPerPage]);

  const handleDeleteWithConfirmation = (title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteTask(title); // your actual delete function
        Swal.fire("Deleted!", "The task has been deleted.", "success");
      }
    });
  };

  // Pagination Logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = allTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show max 5 page numbers at once

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center space-x-1">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => paginate(1)}
              className={`px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200`}
            >
              1
            </button>
            {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-3 py-1 rounded-md ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => paginate(totalPages)}
              className={`px-3 py-1 rounded-md text-gray-700 hover:bg-gray-200`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          {/* Breadcrumb */}
          <nav className="flex mb-2" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <NavLink
                  to="/dashboard"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <TbHomeHeart className="w-4 h-4 mr-2" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <div className="flex items-center">
                  <TiChevronRight className="w-4 h-4 text-gray-400" />
                  <NavLink
                    to="/project"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 md:ml-2"
                  >
                    Projects
                  </NavLink>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <TiChevronRight className="w-4 h-4 text-gray-400" />
                  <span className="ml-1 text-sm font-medium text-blue-600 md:ml-2">
                    Task Detail
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <StatusDashboard />

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Task Management
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <label
                    htmlFor="tasksPerPage"
                    className="text-sm text-gray-600 mr-2"
                  >
                    Show:
                  </label>
                  <select
                    id="tasksPerPage"
                    className="px-2 py-1 border rounded text-sm"
                    value={tasksPerPage}
                    onChange={(e) => {
                      setTasksPerPage(Number(e.target.value));
                      setCurrentPage(1); // Reset to first page when changing items per page
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                <button
                  onClick={openForm}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  <IoMdAdd className="w-5 h-5" />
                  Create New Task
                </button>
              </div>
            </div>

            {/* Slide-in Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end items-center z-50">
                <div
                  className={`bg-white h-full w-[90%] max-w-xl rounded-l-lg p-6 relative transform transition-transform duration-300 ${
                    formVisible ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={closeForm}
                  >
                    &#x2715;
                  </button>
                  <TaskForm onClose={closeForm} fetchTasks={fetchTasks} />
                </div>
              </div>
            )}

            {/* Task Table */}
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : allTasks.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left bg-blue-900 border-b border-gray-100">
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
                          Activity
                        </th>
                        <th className="py-3 px-4 font-medium text-white text-sm">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTasks.map((task) => (
                        <tr
                          key={task._id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                        >
                          {/* Task Name */}
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="bg-indigo-200 p-2 rounded-lg mr-3">
                                {getStatusIcon(task.status)}
                              </div>
                              <div>
                                <NavLink
                                  to="/taskdetail"
                                  className="font-medium text-gray-800 hover:text-blue-600"
                                >
                                  {task.title}
                                </NavLink>
                                <div className="text-xs text-gray-500">
                                  {task.category1}
                                  {task.category2 && `, ${task.category2}`}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Hours */}
                          <td className="py-4 px-4 text-gray-700">
                            {task.hours || 24}
                          </td>

                          {/* Priority */}
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                task.priority === "High"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : task.priority === "Medium"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {task.priority || "Medium"}
                            </span>
                          </td>

                          {/* Assigned To */}
                          <td className="py-4 px-4 text-gray-800 font-medium">
                            {task.assignedTo || "Unassigned"}
                          </td>

                          {/* Status */}
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>
                          </td>

                          {/* Activity */}
                          <td className="py-4 px-4 text-sm text-gray-600">
                            Created:{" "}
                            {new Date(task.createdAt).toLocaleDateString()}
                          </td>

                          {/* Action */}
                          <td className="py-4 px-4">
                            <div className="flex space-x-3">
                              <NavLink
                                to={`/taskform/${task._id}`}
                                className="p-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                              >
                                <Edit className="w-4 h-4 text-blue-600" />
                              </NavLink>
                              <button
                                className="p-1.5 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                onClick={() =>
                                  handleDeleteWithConfirmation(task.title)
                                }
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstTask + 1} to{" "}
                    {Math.min(indexOfLastTask, allTasks.length)} of{" "}
                    {allTasks.length} entries
                  </div>
                  <div className="flex justify-center">
                    {renderPaginationButtons()}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No tasks found. Create a new task to get started.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TaskManagement;
