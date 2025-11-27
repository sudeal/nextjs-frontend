import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const API_BASE_URL = "https://fakestoreapi.com";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        console.warn("İstenen kaynak bulunamadı (404).");
      }
    } else {
      console.error("Ağ hatası veya yanıt alınamadı.");
    }
    return Promise.reject(error);
  }
);


