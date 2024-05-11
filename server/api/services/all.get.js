import { getAllServices } from "~/server/db/services";

export default defineEventHandler(async () => {
  try {
    return await getAllServices();
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Services Get] Something went wrong",
    });
  }
});
