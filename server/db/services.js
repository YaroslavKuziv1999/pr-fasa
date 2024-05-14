import { prisma } from ".";

export const getAllServices = async ({ page, count }) => {
  if(!page || !count) {
    return await prisma.services.findMany();
  }
  
  let skip = +page === 1 ? 0 : +page === 2 ? +count : +count * 2;

  return await prisma.services.findMany({
    skip,
    take: +count,
  });
};
