import { useState } from "react";
import { AiOutlineBarChart } from "react-icons/ai";
import { FiSun, FiPlayCircle, FiCheck } from "react-icons/fi";

export default function ProjectTaskCounter() {
  const [projectStats, setProjectStats] = useState({
    totalTasks: 24,
    inProgress: 8,
    hold: 2,
    completed: 14,
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-6 rounded-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tasks */}
        <div className="relative overflow-hidden bg-white rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="px-2 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-blue-500 tracking-wider">
                  TOTAL TASKS
                </p>
                <h2 className="mt-2 text-xl font-extrabold text-gray-800">
                  {projectStats.totalTasks}
                </h2>
              </div>
              <div className="bg-blue-100 p-1 rounded-lg">
                <AiOutlineBarChart className="h-7 w-7 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-blue-300 to-blue-500"></div>
        </div>

        {/* In Progress Tasks */}
        <div className="relative overflow-hidden bg-white rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="px-2 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-purple-500 tracking-wider">
                  IN PROGRESS
                </p>
                <h2 className="mt-2 text-xl font-extrabold text-gray-800">
                  {projectStats.inProgress}
                </h2>
              </div>
              <div className="bg-purple-100 p-1 rounded-lg">
                <FiSun className="h-7 w-7 text-purple-500" />
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
                  {projectStats.hold}
                </h2>
              </div>
              <div className="bg-amber-100 p-1 rounded-lg">
                <FiPlayCircle className="h-7 w-7 text-amber-500" />
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
                  {projectStats.completed}
                </h2>
              </div>
              <div className="bg-green-100 p-1 rounded-lg">
                <FiCheck className="h-7 w-7 text-green-500" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-500"></div>
        </div>
      </div>
    </div>
  );
}
