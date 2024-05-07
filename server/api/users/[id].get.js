import { getUserById } from "~/server/db/users";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;

    if(!id){
      throw createError({
        statusCode: 500,
        statusMessage: "[User Get] Wrong query params",
      });
    }

    let user = await getUserById(id);

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "[User Get] User not found!",
      });
    }

    return user;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[User Get] Something went wrong",
    });
  }
});
