import { createRecord } from "~/server/db/records";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Records Creation] Wrong body",
      });
    }

    await createRecord({ dateOfVisit: body.dateOfVisit, ...body });
  } catch (error) {
    console.log("error :", error);
    throw createError({
      statusCode: 500,
      statusMessage: "[Records Creation] Something went wrong",
    });
  }
});
