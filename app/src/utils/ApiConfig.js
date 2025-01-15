import axios from "axios";
import { getAuth } from "firebase/auth";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor de solicitudes
API.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
    const refreshToken = auth.currentUser?.stsTokenManager?.refreshToken;
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }
    return config;
  });
  

export default API;
