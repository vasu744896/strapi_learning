import axios from "axios";
import { getsession } from "next-auth/react";
import { toast } from "sonner";
import { handleApiError } from "@/lib/handleApiError";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


axiosInstance.interceptors.request.use(async (config) => {
  const session = await getsession();
  if (session?.user?.jwt) {
    config.headers.Authorization = `Bearer ${session.user.jwt}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errormessage = handleApiError(error);
    toast.error(errormessage);
    return Promise.reject(error);
  }
);

export default axiosInstance;