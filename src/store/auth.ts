import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import type { LoginResponse, TokenPayload } from "../types/auth";
import { logout as apiLogout } from "../api/auth";

const PREFIX = import.meta.env.VITE_APP_PREFIX || "bookspace";
const VERSION = "v1";

const LOCAL_STORAGE = {
  access: `${PREFIX}.${VERSION}.accessToken`,
  refresh: `${PREFIX}.${VERSION}.refreshToken`,
  user: `${PREFIX}.${VERSION}.user`,
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: TokenPayload | null;

  login: (data: LoginResponse) => void;

  logout: () => Promise<void>;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
};

export const useAuth = create<AuthState>((set) => ({
  accessToken: localStorage.getItem(LOCAL_STORAGE.access),
  refreshToken: localStorage.getItem(LOCAL_STORAGE.refresh),
  user: JSON.parse(localStorage.getItem(LOCAL_STORAGE.user) || "null"),

  login: (data) => {
    const accessToken = data.token;
    const refreshToken = data.refreshToken;
    try {
      const user = jwtDecode<TokenPayload>(accessToken);

      localStorage.setItem(LOCAL_STORAGE.access, accessToken);
      localStorage.setItem(LOCAL_STORAGE.refresh, refreshToken);
      localStorage.setItem(LOCAL_STORAGE.user, JSON.stringify(user));

      set({ accessToken, refreshToken, user });
    } catch {
      console.error("Invalid login response", data);
      return;
    }
  },

  logout: async () => {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE.refresh);

    if (refreshToken) {
      try {
        await apiLogout(refreshToken);
      } catch (err) {
        console.error("Backend logout failed", err);
      }
    }

    localStorage.removeItem(LOCAL_STORAGE.access);
    localStorage.removeItem(LOCAL_STORAGE.refresh);
    localStorage.removeItem(LOCAL_STORAGE.user);

    set({ accessToken: null, refreshToken: null, user: null });
  },

  setAccessToken: (token) => {
    localStorage.setItem(LOCAL_STORAGE.access, token);

    const user = jwtDecode<TokenPayload>(token);

    localStorage.setItem(LOCAL_STORAGE.user, JSON.stringify(user));
    set({ accessToken: token, user });
  },

  setRefreshToken: (token) => {
    localStorage.setItem(LOCAL_STORAGE.refresh, token);
    set({ refreshToken: token });
  },
}));
