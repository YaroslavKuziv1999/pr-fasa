import { updateUser } from "~/server/db/users";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      throw createError({
        statusCode: 500,
        statusMessage: "[User Update] Wrong body",
      });
    }

    await updateUser(body);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[User Update] Something went wrong",
    });
  }
});
