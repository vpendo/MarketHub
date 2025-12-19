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
    "auth/login/", // <-- fixed endpoint path
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

  // Store tokens
  localStorage.setItem("access_token", res.data.access);
  localStorage.setItem("refresh_token", res.data.refresh);

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
    "auth/register/", // <-- fixed endpoint path
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

  // Store tokens
  localStorage.setItem("access_token", res.data.access);
  localStorage.setItem("refresh_token", res.data.refresh);

  return { ...res.data, user };
};
