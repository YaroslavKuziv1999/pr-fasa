import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.code || !body.storageCode) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Check Code] Wrong body",
      });
    }

    return await bcrypt.compare(body.code, body.storageCode);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Check Code] Something went wrong",
    });
  }
});
