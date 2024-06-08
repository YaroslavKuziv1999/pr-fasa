import { getAllRecords } from "~/server/db/records";

export default defineEventHandler(async (event) => {
  try {
    const allRecords = await getAllRecords();

    return allRecords.reduce((groups, rec) => {
      const date = rec.dateOfVisit.toISOString().split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(rec);
      return groups;
    }, {});
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Records Get All] Something went wrong",
    });
  }
});
