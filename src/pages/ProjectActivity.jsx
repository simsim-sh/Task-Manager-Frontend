import { useState } from "react";
import { Clock, CheckCircle, AlertCircle, User, Users } from "lucide-react";

// Sample data structure - replace with your actual data
const sampleActivities = [
  {
    id: 1,
    projectName: "Website Redesign",
    taskName: "Create wireframes",
    user: "John Doe",
    timestamp: "2025-04-10T09:30:00",
    type: "completed", // completed, assigned, overdue
    assignedTo: ["John Doe"],
  },
  {
    id: 2,
    projectName: "Website Redesign",
    taskName: "Frontend development",
    user: "Sarah Smith",
    timestamp: "2025-04-09T14:15:00",
    type: "assigned",
    assignedTo: ["Alex Johnson", "Maria Garcia"],
  },
  {
    id: 3,
    projectName: "Mobile App",
    taskName: "User testing",
    user: "Alex Johnson",
    timestamp: "2025-04-08T11:45:00",
    type: "overdue",
    assignedTo: ["Sarah Smith"],
  },
  {
    id: 4,
    projectName: "Marketing Campaign",
    taskName: "Content creation",
    user: "Maria Garcia",
    timestamp: "2025-04-07T16:20:00",
    type: "completed",
    assignedTo: ["John Doe", "Alex Johnson"],
  },
  {
    id: 5,
    projectName: "Database Migration",
    taskName: "Schema design",
    user: "James Wilson",
    timestamp: "2025-04-06T10:00:00",
    type: "assigned",
    assignedTo: ["James Wilson", "Sarah Smith", "Maria Garcia"],
  },
];

export default function UserActivityTimeline() {
  const [activities, setActivities] = useState(sampleActivities);
  const [filter, setFilter] = useState("all"); // all, completed, assigned, overdue

  const filteredActivities =
    filter === "all"
      ? activities
      : activities.filter((activity) => activity.type === filter);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) +
      " at " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  function getActivityIcon(type) {
    switch (type) {
      case "completed":
        return <CheckCircle className="text-green-500" size={20} />;
      case "assigned":
        return <Clock className="text-blue-500" size={20} />;
      case "overdue":
        return <AlertCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  }

  function getActivityText(activity) {
    const { type, taskName, projectName, user, assignedTo } = activity;

    switch (type) {
      case "completed":
        return (
          <span>
            <span className="font-medium">{user}</span> completed task{" "}
            <span className="font-medium">{taskName}</span> in project{" "}
            <span className="font-medium">{projectName}</span>
          </span>
        );
      case "assigned":
        return (
          <span>
            <span className="font-medium">{user}</span> assigned task{" "}
            <span className="font-medium">{taskName}</span> in project{" "}
            <span className="font-medium">{projectName}</span> to{" "}
            {assignedTo.length > 1 ? "multiple users" : assignedTo[0]}
          </span>
        );
      case "overdue":
        return (
          <span>
            Task <span className="font-medium">{taskName}</span> in project{" "}
            <span className="font-medium">{projectName}</span> assigned to{" "}
            <span className="font-medium">{assignedTo.join(", ")}</span> is
            overdue
          </span>
        );
      default:
        return (
          <span>
            Action performed on task{" "}
            <span className="font-medium">{taskName}</span> in project{" "}
            <span className="font-medium">{projectName}</span>
          </span>
        );
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Project Activities
        </h2>
        <div className="mt-2 flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "all"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("assigned")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "assigned"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Assigned
          </button>
          <button
            onClick={() => setFilter("overdue")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "overdue"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Overdue
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto p-4">
        {filteredActivities.length > 0 ? (
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-px bg-gray-200"></div>

            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="mb-6 relative">
                <div className="flex items-start">
                  <div className="relative flex items-center justify-center bg-white z-10">
                    {getActivityIcon(activity.type)}
                  </div>

                  <div className="ml-4 flex-1">
                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-700">
                        {getActivityText(activity)}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {formatDate(activity.timestamp)}
                      </div>

                      {activity.assignedTo &&
                        activity.assignedTo.length > 0 && (
                          <div className="mt-2 flex items-center">
                            <Users size={16} className="text-gray-400 mr-1" />
                            <div className="flex -space-x-2">
                              {activity.assignedTo
                                .slice(0, 3)
                                .map((user, idx) => (
                                  <div
                                    key={idx}
                                    className="h-6 w-6 rounded-full bg-gray-300 border border-white flex items-center justify-center text-xs text-gray-700"
                                  >
                                    {user.charAt(0)}
                                  </div>
                                ))}
                              {activity.assignedTo.length > 3 && (
                                <div className="h-6 w-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-xs text-gray-700">
                                  +{activity.assignedTo.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No activities to display.
          </div>
        )}
      </div>
    </div>
  );
}
