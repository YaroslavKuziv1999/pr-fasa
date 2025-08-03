import { getAllMapLocations } from "~/server/db/mapLocations";

export default defineEventHandler(async (event) => {
  try {
    return await getAllMapLocations();
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[MapLocations Get] Something went wrong",
    });
  }
});
