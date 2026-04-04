import axios from "axios";
import { ENV } from "#/lib/schema";
import type { ErrorResponse } from "#/types/server";

// creating axios instance
const axiosInstance = axios.create({
  baseURL: ENV.VITE_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const error = err.response.data as ErrorResponse;
    return Promise.reject(error);
  },
);

export { axiosInstance };
