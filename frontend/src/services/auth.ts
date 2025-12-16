import api from "./api";
import type { User } from "../types/user";

type AuthResponse = {
  user: User;
  access: string;
  refresh: string;
};

export const login = async (
  email: string,
  password: string
): Promise<{ user: User; access: string; refresh: string }> => {
  const res = await api.post<AuthResponse>("login/", { email, password });
  return res.data;
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
}): Promise<{ user: User; access: string; refresh: string }> => {
  const res = await api.post<AuthResponse>("register/", payload);
  return res.data;
};
