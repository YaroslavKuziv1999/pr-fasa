import { deleteMediaFile } from "~/server/db/mediaFiles";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;

    if (!id) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Media Delete] Bad query params, id not found",
      });
    }

    await deleteMediaFile(id);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Media Delete] Something went wrong",
    });
  }
});
