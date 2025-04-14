import React from "react";
import {
  Calendar,
  Clock,
  FileText,
  User,
  Users,
  Bell,
  Tag,
  ChevronRight,
  MessageSquare,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { TbHomeHeart } from "react-icons/tb";
import { TiChevronRight } from "react-icons/ti";
import { formatDate } from "../utlis/helper";

const TaskDetailsPage = () => {
  const location = useLocation();
  const taskByID = location.state?.task;

  if (!taskByID) {
    return <div className="p-4 text-gray-600">No task data found.</div>;
  }

  // Convert assignedTo to array if it's not already one
  const assignedToArray = Array.isArray(taskByID?.assignedTo)
    ? taskByID?.assignedTo
    : taskByID?.assignedTo
    ? [taskByID?.assignedTo]
    : [];

  // Convert notifyBy to array if it's not already one
  const notifyByArray = Array.isArray(taskByID?.notifyBy)
    ? taskByID?.notifyBy
    : taskByID?.notifyBy
    ? [taskByID?.notifyBy]
    : [];

  // Convert categories to array if it's not already one
  const categoriesArray = Array.isArray(taskByID?.categories)
    ? taskByID?.categories
    : taskByID?.category
    ? [taskByID?.category]
    : [];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="fixed h-full">
        <Sidebar />
      </div>
      {/* Main content area */}
      <div className="flex-1 ml-12 sm:ml-12 md:ml-[15rem] lg:ml-64 flex flex-col">
        <Header />

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            <nav className="flex mb-6" aria-label="Breadcrumb">
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
                    <NavLink
                      to="/taskdetail"
                      className="ml-1 text-sm font-medium text-blue-600 md:ml-2"
                    >
                      Task Detail
                    </NavLink>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-indigo-500">
              <div className=" text-blue-500  p-4 mb-6 flex items-center justify-center">
                <h2 className="text-2xl font-bold tracking-wide">
                  TASK DETAILS
                </h2>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/1 bg-white rounded-lg p-5 border border-gray-200 shadow-md">
                  <div className="flex justify-between items-center mb-3 border-b pb-2">
                    <div className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <FileText size={16} className="text-indigo-500" />
                      {taskByID?.taskName}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={14} className="text-indigo-500" />
                      CREATED AT
                    </div>
                  </div>
                  <div className="flex justify-between mb-4">
                    <div className="font-bold text-lg text-indigo-700">
                      {taskByID?.name}
                    </div>
                    <div className="text-xs bg-indigo-50 px-2 py-1 rounded-md text-indigo-700">
                      {formatDate(taskByID?.createdAt)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-5 border-l-4 border-indigo-400">
                    <p className="text-sm text-gray-700">
                      {taskByID?.description}
                    </p>
                  </div>
                  <div className="flex justify-between mb-5 text-xs bg-blue-50 p-3 rounded-lg">
                    <div className="font-medium flex items-center gap-1">
                      <FileText size={14} className="text-blue-500" />
                      OTHER DOCUMENTS
                    </div>
                    <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1">
                      VIEW IMAGES
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="flex justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm flex items-center gap-2">
                      <Tag size={16} className="text-indigo-500" />
                      Category
                    </div>
                    <div className="text-right">
                      {categoriesArray.map((category, index) => (
                        <div
                          key={index}
                          className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full mb-1 inline-block ml-1"
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 mb-5 overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="text-sm py-3 px-3 bg-gray-50 font-medium flex items-center gap-2">
                            <User size={14} className="text-indigo-500" />
                            CREATED BY
                          </td>
                          <td className="text-sm py-3 px-3 font-medium text-right text-gray-700">
                            {taskByID?.createdBy}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="text-sm py-3 px-3 bg-gray-50 font-medium flex items-center gap-2">
                            <Users size={14} className="text-indigo-500" />
                            ASSIGNED TO
                          </td>
                          <td className="text-sm py-3 px-3 text-right">
                            {assignedToArray.map((person, index) => (
                              <div
                                key={index}
                                className="text-xs font-medium py-1 text-gray-700"
                              >
                                {person}
                              </div>
                            ))}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="text-sm py-3 px-3 bg-gray-50 font-medium flex items-center gap-2">
                            <Calendar size={14} className="text-green-500" />
                            START DATE
                          </td>
                          <td className="text-sm py-3 px-3 text-right text-green-600">
                            {formatDate(taskByID?.startDate)}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="text-sm py-3 px-3 bg-gray-50 font-medium flex items-center gap-2">
                            <Calendar size={14} className="text-red-500" />
                            END DATE
                          </td>
                          <td className="text-sm py-3 px-3 text-right text-red-600">
                            {formatDate(taskByID?.endDate)}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-sm py-3 px-3 bg-gray-50 font-medium flex items-center gap-2">
                            <Bell size={14} className="text-indigo-500" />
                            NOTIFY BY
                          </td>
                          <td className="text-sm py-3 px-3 text-right text-gray-700">
                            {notifyByArray.map((method, index) => (
                              <span
                                key={index}
                                className="inline-block bg-indigo-50 text-indigo-700 text-xs rounded-full px-2 py-1 ml-1"
                              >
                                {method}
                              </span>
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="w-full md:w-1/2 bg-white rounded-lg p-5 border border-gray-200 shadow-md">
                  <div className="flex items-center justify-between mb-4 border-b pb-3">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                      <MessageSquare size={18} className="text-indigo-500" />
                      ACTIVITY LOG
                    </h3>
                  </div>

                  {taskByID?.activities && taskByID.activities[0] && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border-l-4 border-green-400 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={18} className="text-green-500" />
                        <div className="font-bold text-green-700">
                          {taskByID.activities[0].status}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-3">
                        {taskByID.activities[0].timestamp}
                      </div>
                      <div className="text-xs space-y-2 mt-3">
                        {taskByID.activities[0].notes &&
                        Array.isArray(taskByID.activities[0].notes)
                          ? taskByID.activities[0].notes.map((note, index) => (
                              <div
                                key={index}
                                className="p-2 bg-white rounded-md border-l-2 border-indigo-300 shadow-sm"
                              >
                                {note}
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                  )}

                  <div className="p-5 border border-dashed border-gray-300 rounded-lg text-center mt-4">
                    <button className="text-indigo-600 font-medium text-sm flex items-center justify-center gap-2 w-full">
                      <PlusCircle size={18} />
                      ADD NEW ACTIVITY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
