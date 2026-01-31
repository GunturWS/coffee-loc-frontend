import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: response.data,
    };
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          // Forbidden
          console.error("Access forbidden");
          break;
        case 404:
          // Not found
          console.error("Resource not found");
          break;
        case 500:
          // Server error
          console.error("Server error");
          break;
        default:
          console.error("API error:", error.response.data);
      }
    } else if (error.request) {
      // Request made but no response
      console.error("No response from server");
    } else {
      // Error setting up request
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  },
);

const coffeeShopsApi = {
  getAll: (params) => api.get("/coffeeshops", { params }),
};

export { coffeeShopsApi };
export default api;
