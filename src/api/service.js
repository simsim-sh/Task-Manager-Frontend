import { AUTHURL, PROJECTURL } from "./client";
import { catchError } from "../utlis/helper";
import axios from "axios";

// Register
export const register = async (formData) => {
  try {
    const response = await axios.post(`${AUTHURL}/register`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Login
export const login = async (formData) => {
  try {
    const response = await axios.post(`${AUTHURL}/login`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
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
export const GetAllProject = async (projectId) => {
  try {
    const response = await axios.get(
      `${PROJECTURL}/getAllProjects${projectId}`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};


//  Get project by ID
export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`${PROJECTURL}/${projectId}`);
    console.log(`${PROJECTURL}/${projectId}`);  // Debugging log
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
 
//Update project by ID
export const updateProjectById = async (projectId, updatedData) => {
  try {
    const response = await axios.put(`${PROJECTURL}/updateProject/${projectId}`, updatedData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Delete project by ID
export const deleteProjectById = async (projectId) => {
  try {
    const response = await axios.delete(`${PROJECTURL}/deleteProject/${projectId}`);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
