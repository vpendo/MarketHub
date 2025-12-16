import api from "./api";

export type User = {
  id: string;
  name: string;
  email: string;
  is_staff: boolean; // admin flag from backend
  role: "admin" | "customer"; // derived role
};

export type AuthResponse = {
  user: User;
  access: string;
  refresh: string;
};

/**
 * Login user
 */
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>(
    "login/",
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  const user: User = {
    ...res.data.user,
    role: res.data.user.is_staff ? "admin" : "customer",
  };

  return { ...res.data, user };
};

/**
 * Register user
 */
export const register = async (payload: {
  name: string; // must match backend serializer
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>(
    "register/",
    payload,
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  const user: User = {
    ...res.data.user,
    role: res.data.user.is_staff ? "admin" : "customer",
  };

  return { ...res.data, user };
};
