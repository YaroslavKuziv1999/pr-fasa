import { PrismaClient } from "@prisma/client";

import { H3Event } from "h3";

// @ts-ignore
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { phone, email, password } = await readBody(event);

    if (!email || !phone || !password) {
      throw createError({
        statusCode: 500,
        statusMessage: "Missing body",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        phone,
      },
    });

    return { user };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Something went wrong",
    });
  }
});
