import { createUser } from "~/server/db/users";
import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
  try {
    const user = await readBody(event);

    if (!user.email || !user.phone || !user.password) {
      throw createError({
        statusCode: 500,
        statusMessage: "Missing body",
      });
    }

    const resp = await createUser(user);

    return { resp };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
});
