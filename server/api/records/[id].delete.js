import { deleteRecord } from "~/server/db/records";


export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;

    if (!id) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Record Delete] Bad query params, id not found",
      });
    }

    await deleteRecord(id);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Record Delete] Something went wrong",
    });
  }
});
