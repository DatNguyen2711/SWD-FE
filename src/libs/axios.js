import axios from "axios";
import useAuthStore from "../store/auth";

const authApi = axios.create({
  baseURL: "http://localhost:8088",
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

authApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authApi;
