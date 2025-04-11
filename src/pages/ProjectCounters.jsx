import React from "react";
import {
  MdAssignment,
  MdPeople,
  MdPlayCircleFilled,
  MdBolt,
  MdCheckCircle,
  MdWarning,
} from "react-icons/md";

const ProjectCounter = ({ icon, label, count }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="flex items-center p-4">
        <div className="bg-indigo-100 p-3 rounded-lg">
          <div className="text-indigo-600">{icon}</div>
        </div>
        <div className="ml-4">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-800">{count}</p>
        </div>
      </div>
    </div>
  );
};

const ProjectDashboard = () => {
  return (
    <div className="p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800">Project Metrics</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <ProjectCounter
          icon={<MdAssignment className="text-lg" />}
          label="Fresh"
          count={9}
        />

        <ProjectCounter
          icon={<MdPeople className="text-lg" />}
          label="Inactive"
          count={3}
        />

        <ProjectCounter
          icon={<MdPlayCircleFilled className="text-lg" />}
          label="In Progress"
          count={1}
        />

        <ProjectCounter
          icon={<MdBolt className="text-lg" />}
          label="Active"
          count={1}
        />

        <ProjectCounter
          icon={<MdCheckCircle className="text-lg" />}
          label="Completed"
          count={2}
        />
      </div>
    </div>
  );
};

export default ProjectDashboard;
