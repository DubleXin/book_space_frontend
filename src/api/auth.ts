import { callService } from "./client";
import { SERVICES } from "./services";

import type {
  LoginResponse,
  RegisterResponse,
  RefreshResponse,
  LogoutResponse,
} from "../types/auth";

export async function login(email: string, password: string) {
  const res = await callService<LoginResponse>({
    method: "POST",
    url: "/api/auth/login",
    baseURL: SERVICES.auth,
    data: { email, password },
  });
  return res.data;
}

export async function register(email: string, password: string) {
  const res = await callService<RegisterResponse>({
    method: "POST",
    url: "/api/auth/register",
    baseURL: SERVICES.auth,
    data: { email, password },
  });
  return res.data;
}

export async function refresh(refreshToken: string) {
  const res = await callService<RefreshResponse>({
    method: "POST",
    url: "/api/auth/refresh",
    baseURL: SERVICES.auth,
    data: { token: refreshToken },
  });
  return res.data;
}

export async function logout(refreshToken: string) {
  const res = await callService<LogoutResponse>({
    method: "POST",
    url: "/api/auth/logout",
    baseURL: SERVICES.auth,
    data: { token: refreshToken },
  });
  return res.data;
}
