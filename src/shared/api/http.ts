import axios from "axios";
import { API_URL } from "@/shared/config";
import { getAuthToken } from "@/shared/auth/token-storage";

// One axios instance for the whole app: it knows the API base URL and signs requests with the
// stored token, so callers pass paths such as "/orders" and never build headers themselves.
export const http = axios.create({ baseURL: API_URL });

http.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { isAxiosError } from "axios";
