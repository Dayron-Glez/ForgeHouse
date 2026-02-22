import api from "@/lib/axios";
import type {
  UserProfile,
  UpdateProfileRequest,
  ApiResponse,
} from "@forgehouse/shared";

export const userService = {
  getProfile: (): Promise<ApiResponse<UserProfile>> =>
    api.get<ApiResponse<UserProfile>>("/users/me").then((res) => res.data),

  updateProfile: (
    data: UpdateProfileRequest,
  ): Promise<ApiResponse<UserProfile>> =>
    api
      .patch<ApiResponse<UserProfile>>("/users/me", data)
      .then((res) => res.data),

  uploadAvatar: (file: File): Promise<ApiResponse<UserProfile>> => {
    const formData = new FormData();
    formData.append("avatar", file);
    return api
      .post<ApiResponse<UserProfile>>("/users/me/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },

  removeAvatar: () => api.delete<ApiResponse<UserProfile>>("/users/me/avatar"),
};
