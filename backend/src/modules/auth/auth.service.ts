import { AppDataSource } from "../../config/database";
import { User } from "../../entities/User.entity";
import { RefreshToken } from "../../entities/RefreshToken.entity";
import { hashPassword, comparePassword } from "../../utils/password.utils";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.utils";

const userRepository = AppDataSource.getRepository(User);
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

export const register = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<{
  user: { id: string; email: string; firstName: string; lastName: string };
  tokens: { accessToken: string; refreshToken: string };
}> => {
  const existingUser = await userRepository.findOne({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = userRepository.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
  });

  await userRepository.save(user);

  const tokens = await generateTokens(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    tokens,
  };
};

export const login = async (
  email: string,
  password: string,
): Promise<{
  user: { id: string; email: string; firstName: string; lastName: string };
  tokens: { accessToken: string; refreshToken: string };
}> => {
  const user = await userRepository.findOne({
    where: { email },
    select: ["id", "email", "firstName", "lastName", "password", "isActive"],
  });

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  if (!user.isActive) {
    throw new Error("Cuenta desactivada");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error("Credenciales inválidas");
  }

  const tokens = await generateTokens(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    tokens,
  };
};

export const refreshAccessToken = async (
  refreshTokenValue: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; firstName: string; lastName: string };
}> => {
  let payload;
  try {
    payload = verifyRefreshToken(refreshTokenValue);
  } catch (error) {
    throw new Error("Refresh token inválido");
  }

  const storedToken = await refreshTokenRepository.findOne({
    where: { token: refreshTokenValue, isRevoked: false },
  });

  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new Error("Refresh token expirado o revocado");
  }

  const user = await userRepository.findOne({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Revoke old refresh token
  storedToken.isRevoked = true;
  await refreshTokenRepository.save(storedToken);

  // Generate new token pair
  const tokens = await generateTokens(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    ...tokens,
  };
};

export const logout = async (userId: string): Promise<void> => {
  await refreshTokenRepository.update(
    { userId, isRevoked: false },
    { isRevoked: true },
  );
};

async function generateTokens(
  user: User,
): Promise<{ accessToken: string; refreshToken: string }> {
  const tokenPayload = { userId: user.id, email: user.email };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const refreshTokenEntity = refreshTokenRepository.create({
    token: refreshToken,
    userId: user.id,
    expiresAt,
  });

  await refreshTokenRepository.save(refreshTokenEntity);

  return { accessToken, refreshToken };
}
