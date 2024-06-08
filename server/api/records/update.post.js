import { updateRecord } from "~/server/db/records";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Record Update] Wrong body",
      });
    }

    await updateRecord(body);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Record Update] Something went wrong",
    });
  }
});
