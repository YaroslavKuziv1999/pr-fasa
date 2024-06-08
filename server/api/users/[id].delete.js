import { deleteAllMediaFiles } from "~/server/db/mediaFiles";
import { deleteAllRecords } from "~/server/db/records";
import { deleteUser } from "~/server/db/users";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;
    
    if(!id){
      throw createError({
        statusCode: 500,
        statusMessage: "[User Delete] Wrong query params",
      });
    }

    await deleteAllRecords(id);
    await deleteAllMediaFiles(id);
    await deleteUser(id);
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[User Delete] Something went wrong",
    });
  }
});
