import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";
import Dashboard from "./Component/Dashboard";
import ProjectDetails from "./pages/ProjectDashboard";
import ProjectDetailPage from "./Component/ProjectDetailPage";
// import TaskManagement from "./Component/TaskManagement";
import TaskDetailsPage from "./Component/TaskDetailsPage";
import AddTask from "./Component/AddTask";
import AddProjectForm from "./Component/AddProjectForm";
import AddUserPage from "./Component/AddUser";

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/register", element: <SignUp /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/project", element: <ProjectDetails /> },
  { path: "/projectdetail", element: <ProjectDetailPage /> },
  // { path: "/taskmanagement", element: <TaskManagement /> },
  { path: "/taskdetail", element: <TaskDetailsPage /> },
  { path: "/addtask", element: <AddTask /> },
  { path: "/addprojectform", element: <AddProjectForm /> },
  { path: "/adduser", element: <AddUserPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
