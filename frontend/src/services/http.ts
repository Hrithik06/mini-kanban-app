import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong. Try again later.";
    let status = 0;
    if (error.response) {
      status = error.response.status;
      message =
        error.response.data?.error || error.response.data?.message || message;
      if (status === 500) message = "Server error. Try again later.";
    } else if (error.request) {
      message = "Network error. Check your connection.";
    } else {
      message = error.message;
    }
    return Promise.reject({ message, status });
  },
);
