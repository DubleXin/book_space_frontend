import { create } from "zustand";

const PREFIX = import.meta.env.VITE_APP_PREFIX || "bookspace";
const VERSION = "v1";

const LOCAL_STORAGE = {
  access: `${PREFIX}.${VERSION}.accessToken`,
  refresh: `${PREFIX}.${VERSION}.refreshToken`,
  user: `${PREFIX}.${VERSION}.user`,
};

type User = {
  id: number;
  email: string;
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;

  login: (data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  }) => void;

  logout: () => void;
  setAccessToken: (token: string) => void;
};

export const useAuth = create<AuthState>((set) => ({
  accessToken: localStorage.getItem(LOCAL_STORAGE.access),
  refreshToken: localStorage.getItem(LOCAL_STORAGE.refresh),
  user: JSON.parse(localStorage.getItem(LOCAL_STORAGE.user) || "null"),

  login: ({ accessToken, refreshToken, user }) => {
    localStorage.setItem(LOCAL_STORAGE.access, accessToken);
    localStorage.setItem(LOCAL_STORAGE.refresh, refreshToken);
    localStorage.setItem(LOCAL_STORAGE.user, JSON.stringify(user));

    set({ accessToken, refreshToken, user });
  },

  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE.access);
    localStorage.removeItem(LOCAL_STORAGE.refresh);
    localStorage.removeItem(LOCAL_STORAGE.user);

    set({ accessToken: null, refreshToken: null, user: null });
  },

  setAccessToken: (token) => {
    localStorage.setItem(LOCAL_STORAGE.access, token);
    set({ accessToken: token });
  },
}));
