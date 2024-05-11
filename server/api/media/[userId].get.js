import { getMediaFilesByUserID } from "~/server/db/mediaFiles";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;

    if(!id) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Media Get] UserId not found",
      });
    }

    return await getMediaFilesByUserID(id);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Media Get] Something went wrong",
    });
  }
});
