export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  dateOfBirth: string | null;
  gender: "male" | "female" | "other" | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends Omit<User, "isActive"> {}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
}
