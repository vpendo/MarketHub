import { create } from "zustand";
import api from "../services/api";
import type { User } from "../types/user";

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const loadUser = (): User | null => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch (err) {
    return null;
  }
};

const _initialUser = loadUser();
if (_initialUser && _initialUser.token) {
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${_initialUser.token}`;
  } catch (err) {}
}

export const useUserStore = create<UserState>((set) => ({
  user: _initialUser,
  setUser: (user) => {
    try {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        if (user.token) api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      } else {
        localStorage.removeItem("user");
      }
    } catch (err) {
      // ignore storage errors
    }
    set({ user });
  },
  logout: () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      delete api.defaults.headers.common["Authorization"];
    } catch (err) {}
    set({ user: null });
  },
}));

