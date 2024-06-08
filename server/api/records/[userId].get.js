import { subDays } from "date-fns";
import { getAllUserRecords } from "~/server/db/records";
import { getServiceByIds } from "~/server/db/services";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params;

    if (!id) {
      throw createError({
        statusCode: 500,
        statusMessage: "[Records Get] UserId not found",
      });
    }

    const userRecords = await getAllUserRecords(id);
    if(!userRecords.length) return [];
    
    const services = await getServiceByIds(
      userRecords.map((rec) => rec.serviceId)
    );

    return userRecords.map((rec) => {
      return { ...rec, service: services.find((e) => e.id === rec.serviceId) };
    }).filter((rec) => new Date(rec.dateOfVisit) > subDays(new Date(),1));
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Records Get] Something went wrong",
    });
  }
});
