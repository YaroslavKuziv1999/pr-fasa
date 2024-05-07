import { getMediaFilesByUserID } from "~/server/db/mediaFiles";

export default defineEventHandler(async (event) => {
  try {
    const { userId } = event.context.params;

    if(!userId) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Media Get] UserId not found",
      });
    }

    return await getMediaFilesByUserID(userId);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Media Get] Something went wrong",
    });
  }
});
