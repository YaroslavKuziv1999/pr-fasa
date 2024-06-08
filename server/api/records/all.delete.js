import { deleteAllRecords } from "~/server/db/records";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Delete All Records] Body not found",
      });
    }

    await deleteAllRecords(body.userId)
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Delete All Records] Something went wrong",
    });
  }
});
