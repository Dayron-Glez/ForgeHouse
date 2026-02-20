import { AppDataSource } from "../../config/database";
import { User } from "../../entities/User.entity";
import fs from "fs";
import path from "path";

const userRepository = AppDataSource.getRepository(User);

export const getProfile = async (userId: string) => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) throw new Error("Usuario no encontrado");

  const { isActive, ...profile } = user;
  return profile;
};

export const updateProfile = async (
  userId: string,
  data: Partial<{
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    gender: "male" | "female" | "other";
  }>,
): Promise<Partial<User>> => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) throw new Error("Usuario no encontrado");

  Object.assign(user, data);
  await userRepository.save(user);

  const { isActive, ...profile } = user;
  return profile;
};

export const uploadAvatar = async (
  userId: string,
  filePath: string,
): Promise<Partial<User>> => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) throw new Error("Usuario no encontrado");

  // Delete old avatar if exists
  if (user.avatarUrl) {
    const oldAvatarFile = user.avatarUrl.replace(/^\//, "");
    const oldPath = path.resolve(oldAvatarFile);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  // Convert file system path to URL path (normalize Windows backslashes)
  const avatarUrl = "/" + filePath.replace(/\\/g, "/");
  user.avatarUrl = avatarUrl;
  await userRepository.save(user);

  const { isActive, ...profile } = user;
  return profile;
};

export const removeAvatar = async (userId: string): Promise<Partial<User>> => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) throw new Error("Usuario no encontrado");

  if (user.avatarUrl) {
    const oldAvatarFile = user.avatarUrl.replace(/^\//, "");
    const oldPath = path.resolve(oldAvatarFile);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  user.avatarUrl = null;
  await userRepository.save(user);

  const { isActive, ...profile } = user;
  return profile;
};
