import { prisma } from ".";

export const createRecord = async (record) => {
  return await prisma.records.create({
    data: { ...record, dateOfVisit: new Date(record.dateOfVisit) },
  });
};

export const getAllUserRecords = async (userId) => {
  return await prisma.records.findMany({
    where: { userId },
  });
};

export const deleteAllRecords = async (userId) => {
  return await prisma.records.deleteMany({
    where: { userId },
  });
};

export const deleteRecord = async (id) => {
  return await prisma.records.delete({
    where: {
      id,
    },
  });
};

export const updateRecord = async (recordData) => {
  const { id, data, many } = recordData;

  if (many) {
    return await prisma.records.updateMany({
      where: {
        id: {
          in: id,
        },
      },
      data,
    });
  }

  return await prisma.records.update({
    where: {
      id,
    },
    data,
  });
};

export const getAllRecords = async () => {
  return await prisma.records.findMany();
};
