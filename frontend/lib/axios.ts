import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/handleApiError";

/**
 * Axios instance configured for Strapi
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL, // ✅ FIXED
});

/**
 * Request Interceptor
 * Attaches JWT token from NextAuth session (if available)
 */
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();

    if (session?.user && "jwt" in session.user) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${
        (session.user as { jwt: string }).jwt
      }`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles API errors globally
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const errorMessage = handleApiError(error);
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export default axiosInstance;
