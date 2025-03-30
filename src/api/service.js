import { AUTHURL, PROJECTURL } from "./client";
import { catchError } from "../utlis/helper";
import axios from "axios";

//register
export const register = async (formData) => {
  try {
    const response = await axios.post(`${AUTHURL}/register`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//login
export const login = async (formData) => {
  try {
    const response = await axios.post(`${AUTHURL}/login`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//create project
export const createProject = async (formData) => {
  try {
    const response = await axios.post(`${PROJECTURL}/createProject`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//Get project
export const GetProject = async (titleName) => {
  try {
    const response = await axios.get(
      `${PROJECTURL}/getProjectByTitle?title=${titleName}`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};
