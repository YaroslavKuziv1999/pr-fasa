import { getServiceByIds } from "~/server/db/services";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;

    if (!id) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Services Get by Id] Bad query params, id not found",
      });
    }

    return await getServiceByIds(id);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Services Get by Id] Something went wrong",
    });
  }
});
