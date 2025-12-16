export type User = {
  id: string;
  name: string;
  email: string;
  token?: string;
  role?: "admin" | "customer";
  is_staff?: boolean;
};
