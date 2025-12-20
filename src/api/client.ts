import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuth } from "../store";

const AUTH_URL = import.meta.env.VITE_AUTH_SERVICE_ADDRESS! as string;
const api = axios.create();
api.defaults.withCredentials = true;

interface RetryAxiosConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = useAuth.getState().accessToken;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const auth = useAuth.getState();
    const originalRequest = error.config as RetryAxiosConfig;

    const isRefreshCall =
      typeof originalRequest?.url === "string" &&
      originalRequest.url.includes("/api/auth/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshCall
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post(`${AUTH_URL}/api/auth/refresh`, {
          token: auth.refreshToken,
        });

        const newAccessToken = res.data.token;

        if (!newAccessToken || typeof newAccessToken !== "string") {
          console.error("Invalid refresh response:", res.data);
          await useAuth.getState().logout();
          processQueue("Invalid refresh token");
          isRefreshing = false;
          return Promise.reject("Invalid refresh token");
        }

        useAuth.getState().setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);
        isRefreshing = false;

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        isRefreshing = false;

        useAuth.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export function callService<T = unknown>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return api.request<T>(config);
}

export default api;
