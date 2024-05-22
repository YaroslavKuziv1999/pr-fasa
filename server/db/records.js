import { prisma } from ".";

export const createRecord = (record) => {
  return prisma.records.create({
    data: record,
  });
};
