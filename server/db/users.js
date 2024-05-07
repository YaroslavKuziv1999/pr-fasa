import { prisma } from ".";
import bcrypt from "bcrypt";

export const createUser = async (userData) => {
  const finalUserData = {
    ...userData,
    hashedPassword: await bcrypt.hashSync(userData.password, 12),
  };

  delete finalUserData.password;

  return await prisma.user.create({
    data: finalUserData,
  });
};

export const getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const updateUser = async (userData) => {
  const { id, ...formedData } = userData;


  return await prisma.user.update({
    where: {
      id,
    },
    data: formedData,
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: {
      id,
    }
  });
};
