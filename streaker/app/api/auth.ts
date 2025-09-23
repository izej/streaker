import axios from "axios";

const API_URL = "http://10.0.2.2:8080/api/v1/auth";

export const signup = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/signup`, { email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};
