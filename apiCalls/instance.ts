import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
let baseURL = "http://localhost:3001";
if (process.env.ENV === "production") {
  baseURL = process.env.NEXT_PUBLIC_BACKEND_URL!;
}
const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

type ApiResponse<T = any> = {
  data: T;
  status: "success" | "error";
  message: string;
};

// Function to parse cookies and retrieve the token
function getCookieValue(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

API.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  // ✅ Client-side
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("donor_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  } else {
    // ✅ Server-side
    try {
      const { headers } = require("next/headers");
      const cookieHeader = headers().get("cookie");

      if (cookieHeader) {
        config.headers["Cookie"] = cookieHeader;
      }
    } catch (err) {
      console.error("Server-side header setup failed", err);
    }
  }

  return config;
});

// Global response interceptor
API.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => response,
  (error: AxiosError<ApiResponse>) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message =
        error.response?.data?.message || error.message || "Unknown error";

      return Promise.reject({
        status,
        message,
        originalError: error,
      });
    }

    return Promise.reject({
      status: 500,
      message: "Unexpected error",
      originalError: error,
    });
  }
);

export default API;
