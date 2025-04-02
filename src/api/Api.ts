import axios, { AxiosResponse } from "axios";
import { Cookies } from "react-cookie";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const cookies = new Cookies();

api.interceptors.request.use((config) => {
  const token = cookies.get("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    return Promise.reject(error);
  },
);
