import api from "./api";
import type { User } from "../types/user";

type AuthResponse = { user: User; access: string; refresh: string };

export const login = async (email: string, password: string): Promise<User> => {
  const res = await api.post<AuthResponse>("login/", { email, password });
  const { access, refresh } = res.data;
  try {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  } catch (err) {
    // ignore storage errors
  }
  return { ...res.data.user, token: access };
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post<AuthResponse>("register/", payload);
  const { access, refresh } = res.data;
  try {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  } catch (err) {
    // ignore storage errors
  }
  return { ...res.data.user, token: access };
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  try {
    delete api.defaults.headers.common["Authorization"];
  } catch (err) {}
};
