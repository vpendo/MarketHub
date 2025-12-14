import api from "./api";
import type { User } from "../types/user";

type AuthResponse = { user: User; token: string };

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("login/", { email, password });
  const { user, token } = res.data;
  // persist token and set default header
  try {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    document.cookie = `token=${token}; path=/; samesite=Lax`;
  } catch (e) {
    /* ignore in non-browser env */
  }
  return { user, token };
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("register/", payload);
  // Do NOT persist token automatically after registration — require explicit login
  return res.data;
};
