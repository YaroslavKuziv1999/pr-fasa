import { getAllServices } from "~/server/db/services";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    
    return await getAllServices(query);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Services Get] Something went wrong",
    });
  }
});
