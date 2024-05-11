import { prisma } from ".";

export const getAllServices = async () => {
  return await prisma.services.findMany();
};
