import axios from "axios";
import { toast } from "react-toastify";

const customNavigate = (path) => {
  window.location.href = path;
};

export const BASE_URL = "https://api.nexismarket.owpmf.tech/";
// const BASE_URL = "http://localhost:8003/";

//192.168.29.22
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


const handleApiError = (error) => {
  if (error.response) {
    console.error("Data:", error.response.data);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);

    // if (error.response.data.message === 'Token expired' || error.response.data.message === 'Invalid token') {
    //   localStorage.clear();
    //   customNavigate("/auth");
    // }

    if (error.response.data.message === 'Token expired' || error.response.data.message === 'Invalid token') {
      toast.error(error.response.data.message, {
        onClose: () => {
          localStorage.clear();
          customNavigate("/auth");
        }
      });
    } else {
      toast.error(error.response.data.message);
    }

  } else if (error.request) {
    console.error("Request:", error.request);
  } else {
    console.error("Error:", error.message);
  }
  console.error("Config:", error.config);
};

const getAuthToken = () => localStorage.getItem("token");
// const token = import.meta.env.VITE_REACT_APP_TOKEN

export const apiService = {
  async get(endpoint, requiresAuth = true) {
    try {
      const config = {
        // params,
        headers: { Authorization: `Bearer ${getAuthToken()}`, country: 'india' },
        // headers: { Authorization: "Bearer " + token }
      };


      const response = await api.get(endpoint, requiresAuth ? config : null);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  async post(endpoint, data = {}, requiresAuth = true) {
    try {
      const config = {
        headers: requiresAuth
          ? { Authorization: `Bearer ${getAuthToken()}`, country: "india" }
          : // ? { Authorization: "Bearer " + token }
          {},
      };
      const response = await api.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  async put(endpoint, data = {}, requiresAuth = true) {
    try {
      const config = {
        headers: requiresAuth
          ? { Authorization: `Bearer ${getAuthToken()}`, country: "india" }
          : {},
      };
      const response = await api.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  async delete(endpoint, requiresAuth = true) {
    try {
      const config = {
        headers: requiresAuth
          ? { Authorization: `Bearer ${getAuthToken()}`, country: "india" }
          : {},
      };
      const response = await api.delete(endpoint, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
};

export default api;
