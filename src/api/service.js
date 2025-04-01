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
    return response.data;
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
