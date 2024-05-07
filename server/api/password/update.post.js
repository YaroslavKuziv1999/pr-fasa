import bcrypt from "bcrypt";
import { updateUser } from "~/server/db/users";

export default defineEventHandler(async (event) => {
  try {
    const { id, password } = await readBody(event);

    if (!id || !password) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Reset Password] Wrong body",
      });
    }

    await updateUser({
      id,
      hashedPassword: await bcrypt.hashSync(password, 12),
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Reset Password] Something went wrong",
    });
  }
});
