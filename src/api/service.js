import { AUTHURL, PROJECTURL, TASKURL, ACTIVITYURL, USERURL} from "./client";
import { catchError } from "../utlis/helper";
import axios from "axios";



// Register API
export const register = async (formData) => {
  try {
    const response = await axios.post(`${AUTHURL}/register`, formData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    // If the error has a response object, log the response data and the status code
    if (error.response) {
      console.error('Error occurred during registration:', error.response.data); // Response data
      console.error('Status Code:', error.response.status); // Status code (e.g., 400, 500, etc.)
      return error.response.data; // Return the error response data from the server
    }

    // If no response (e.g., network error), log a more general error
    console.error('Network or server error:', error.message); // Error message
    return { success: false, error: 'An error occurred. Please try again later.' }; // Return a generic error
  }
};

// Login API
export const login = async (formData) => {
  try {
    const response = await axios.post(`${AUTHURL}/login`, formData, {
      withCredentials: true, // This is used if you want to use cookies for session management.
    });

    // If login is successful, store the token in localStorage
    if (response.data.success && response.data.token) {
      localStorage.setItem("jwtToken", response.data.token); // Store the token in localStorage
      const decodedToken = decodeJwtToken(response.data.token);
       localStorage.setItem("role", decodedToken.role); 
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return catchError(error);
  }
};


const decodeJwtToken = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const decoded = JSON.parse(window.atob(base64));
  return decoded;
};

// Create project
export const createProject = async (formData) => {
  try {
    const response = await axios.post(`${PROJECTURL}/createProject`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Get project by title
export const getAllProject = async () => {
  try {
    const response = await axios.get(`${PROJECTURL}/getAllProjects`);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// http://localhost:3000/api/project/getProjectById/67eb6a63bf394bd8fd568142
export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(
      `${PROJECTURL}/getProjectById/${projectId}`
    );
    return response;
  } catch (error) {
    return catchError(error);
  }
};

//Update project by ID
export const updateProjectById = async (projectId, formData) => {
  try {
    const response = await axios.put(
      `${PROJECTURL}/updateProject/${projectId}`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Delete project by ID
export const deleteProjectById = async (projectId) => {
  try {
    const response = await axios.delete(
      `${PROJECTURL}/deleteProject/${projectId}`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Create new task
export const createTask = async (formData) => {
  try {
    const response = await axios.post(`${TASKURL}/createTask`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Get all tasks
export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${TASKURL}/getAllTasks`);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Get task by ID
export const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(`${TASKURL}/getTaskById/${taskId}`);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Update task by ID
export const updateTaskById = async (taskId, formData) => {
  try {
    const response = await axios.put(  
      `${TASKURL}/updateTaskById/${taskId}`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Delete task by title
export const deleteTaskByTitle = async (title) => {
  try {
    const response = await axios.delete(`${TASKURL}/deleteTask`, {
      params: { title },
    });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};


// create user
export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem("jwtToken");

    // Send POST request to create a new user
    const response = await axios.post(`${USERURL}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token for authorization
      },
    });

    return response.data; // Return the response data (created user data)
  } catch (error) {
    console.error("Error creating user:", error);
    return catchError(error); // Handle errors
  }
};

// Get all user
export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("jwtToken");

    // Send request to the backend API with Bearer token for authentication
    const response = await axios.get(`${USERURL}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token for authorization
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching users:", error);
    return catchError(error); // Handle errors
  }
};

// update user by ID
export const updateUserById = async (userId, formData) => {
  try {
    const token = localStorage.getItem("jwtToken");

    // Send PUT request to update user data
    const response = await axios.put(`${USERURL}/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token for authorization
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error updating user:", error);
    return catchError(error); // Handle errors
  }
};

// delete user by ID
export const deleteUserById = async (userId) => {
  try {
    const token = localStorage.getItem("jwtToken");

    // Send DELETE request to delete a user by userId
    const response = await axios.delete(`${USERURL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token for authorization
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error deleting user:", error);
    return catchError(error); // Handle errors
  }
};


// donut chart api
export const getProjectStatusSummary = async () => {
  try {
    const response = await axios.get(`${PROJECTURL}/status-summary`);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Get all activities
export const getAllActivities = async () => {
  try {
    const response = await axios.get(`${ACTIVITYURL}/`);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Get activities by project name and filter
export const getActivitiesByProject = async (projectName, filter) => {
  try {
    const response = await axios.get(
      `${ACTIVITYURL}/getByProject`,
      (projectName, filter)
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const createActivity = async (formData) => {
  try {
    const response = await axios.post(
      `${ACTIVITYURL}/createActivity`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//http://localhost:3000/api/task/getTaskByTitle?title=Amazon
export const getTaskByTitle = async (title) => {
  try {
    const response = await axios.get(
      `${TASKURL}/getTaskByTitle?title=${title}`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
