import { create } from "zustand";
import type { User } from "../types/user";
import { setAuthToken } from "../services/api";

type UserState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: (() => {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  })(),
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.token) {
        setAuthToken(user.token);
        localStorage.setItem("access_token", user.token);
      }
      set({ user });
    } else {
      localStorage.removeItem("user");
      set({ user: null });
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuthToken(undefined);
    set({ user: null, accessToken: null, refreshToken: null });
  },
}));

