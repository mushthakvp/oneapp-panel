import axios from "axios";
import { toast } from "react-toastify";
import { cookieLogout, getCookie } from "../utils/settingCookie";

const customNavigate = (path) => {
  window.location.href = path;
};

// const BASE_URL = "http://localhost:8003/";
const BASE_URL = "https://api.nexismarket.owpmf.tech/";

//192.168.29.22
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const handleCheckCookie = () => {
  // const currentToken = localStorage.getItem("token");

  // const token = getCookie("token");
  // if (!token) {
  //   cookieLogout();
  //   localStorage.clear();
  //   customNavigate("/auth");
  // } else if (currentToken !== token) {
  //   localStorage.clear();
   
  //    const email = getCookie("email");
  //    const name = getCookie("name");
  //    const role = getCookie("role");
  //    if (token && role === "admin") {
  //      localStorage.setItem("token", token);
  //      localStorage.setItem("role", role);
  //      localStorage.setItem("mail", email);
  //      localStorage.setItem("name", name);
      
  //    }
  // }
}
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
          cookieLogout();
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

// const getAuthToken = () => {
//    return '5dac68d93137d6ff06b582736ac2029a66d0cc1a64a19dce1450b0149ada523cea1377c615cf44c3f521cb2f8748259ca7d4877d54efa8225665abd52b2ccfdcef25e29d6d3da604e4ab393401967cdceda70ac1a0619aa1c4130c1495b3fcff6f1956ba285235d70de62beee7b3eb55cfdcb5349f6bd02bbedafa05a6be88d603b91bcb215a0c3f4e3eb6c614095a7de5e1cb629054ce53ba53254e8e8a38788f884bbcc393e827dcf8917419921e9f'
// }

export const apiService = {
  async get(endpoint, requiresAuth = true) {
    handleCheckCookie();
    try {
      const config = {
        // params,
        headers: { Authorization: `Bearer ${getAuthToken()}`,country:'india' },
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
     handleCheckCookie();
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
     handleCheckCookie();
    try {
      const config = {
        headers: requiresAuth
          ? { Authorization: `Bearer ${getAuthToken()}`,country: "india"  }
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
     handleCheckCookie();
    try {
      const config = {
        headers: requiresAuth
          ? { Authorization: `Bearer ${getAuthToken()}`,country: "india"  }
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
