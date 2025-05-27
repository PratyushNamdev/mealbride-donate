import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
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
      const status = error.response?.status;
      console.error("API error response:", error.response);

      if (status === 401) {
        console.error("Unauthorized. Redirecting to login.");
      } else if (status === 403) {
        console.error("Forbidden. You don’t have permission.");
      } else if (status === 500) {
        console.error("Server error. Please try again later.");
      } else {
        console.error(error.response?.data?.message || "Something went wrong");
      }

      return Promise.reject(error.response?.data || error);
    }

    return Promise.reject(error);
  }
);

export default API;
