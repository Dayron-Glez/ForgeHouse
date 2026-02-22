import api from "@/lib/axios";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@forgehouse/shared";

export const authService = {
  login: (data: LoginRequest): Promise<{ data: AuthResponse }> =>
    api
      .post<{ data: AuthResponse }>("/auth/login", data)
      .then((res) => res.data),

  register: (
    data: Omit<RegisterRequest, "confirmPassword"> & {
      confirmPassword: string;
    },
  ) =>
    api
      .post<{ data: AuthResponse }>("/auth/register", data)
      .then((res) => res.data),

  refresh: (refreshToken: string) =>
    api
      .post<{ data: AuthResponse }>("/auth/refresh", { refreshToken })
      .then((res) => res.data),

  logout: () => api.post("/auth/logout"),
};
