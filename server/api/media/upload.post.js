import { createMediaFile } from "~/server/db/mediaFiles";
import { uploadToCloudinary } from "~/server/utils/cloudinary";
import formidable from "formidable";

export default defineEventHandler(async (event) => {
  try {
    const form = formidable({});
    const response = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve({ fields, files });
      });
    });

    const { fields, files } = response;

    const filePromises = Object.keys(files).map(async (key) => {
      const file = files[key];

      const cloudinaryResource = await uploadToCloudinary(file[0].filepath);

      return createMediaFile({
        url: cloudinaryResource.secure_url,
        providerPublicId: cloudinaryResource.public_id,
        bytes: cloudinaryResource.bytes,
        userId: fields.userId[0],
      });
    });

    let mediaFiles = await Promise.all(filePromises);

    return {
      url: mediaFiles[0].url,
      id: mediaFiles[0].id,
      size: mediaFiles[0].bytes,
    };
    
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "[Media Upload] Something went wrong",
    });
  }
});
