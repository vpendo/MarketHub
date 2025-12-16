import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("access_token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("access_token");
  }
};

// Attach access token from localStorage on each request
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("access_token");
    if (token && config && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (err) {
    // ignore
  }
  return config;
});

// Refresh logic for 401 responses
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token as string);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const error = err;
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return api(originalRequest);
            })
            .catch((e) => Promise.reject(e));
        }

        isRefreshing = true;
        try {
          const response = await axios.post(baseURL + "auth/refresh/", { refresh });
          const newAccess = response.data.access;
          localStorage.setItem("access_token", newAccess);
          api.defaults.headers.common["Authorization"] = "Bearer " + newAccess;
          processQueue(null, newAccess);
          originalRequest.headers["Authorization"] = "Bearer " + newAccess;
          return api(originalRequest);
        } catch (refreshErr) {
          processQueue(refreshErr, null);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;