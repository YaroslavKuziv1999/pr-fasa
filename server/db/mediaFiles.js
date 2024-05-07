import { prisma } from ".";

export const createMediaFile = (mediaFile) => {
  return prisma.mediaFile.create({
    data: mediaFile,
  });
};

export const deleteMediaFile = async (id) => {
  let mediaFile = await prisma.mediaFile.findUnique({
    where: { id },
  });
  
  deleteFromCloudinary(mediaFile.providerPublicId);
  
  return await prisma.mediaFile.delete({
    where: {
      id,
    },
  });
};

export const getMediaFilesByUserID = async (userId) => {
  return await prisma.mediaFile.findMany({
    where: {
      userId,
    },
  });
};

export const deleteAllMediaFiles = async (userId) => {
  let mediaFiles = await getMediaFilesByUserID(userId);

  mediaFiles.map((mf) => {
    deleteFromCloudinary(mf.providerPublicId);
  });

  return await prisma.mediaFile.deleteMany({
    where: {
      userId,
    },
  });
};
