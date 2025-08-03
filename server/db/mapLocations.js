import { prisma } from ".";

export const getAllMapLocations = async () => {
  return {
    db: await prisma.mapLocations.findMany(),
    cloudinary: await getAllImagesFromFolder("Poznan"),
  };
};
