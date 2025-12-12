import api from "./api";
import type { User } from "../types/user";

type AuthResponse = { user: User; token: string };

export const login = async (email: string, password: string): Promise<User> => {
  const res = await api.post<AuthResponse>("login/", { email, password });
  return { ...res.data.user, token: res.data.token };
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const res = await api.post<AuthResponse>("/register/", payload);
  return { ...res.data.user, token: res.data.token };
};
