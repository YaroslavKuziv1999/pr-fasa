import { v2 as _cloudinary } from "cloudinary";

const cloudinary = () => {
  const config = useRuntimeConfig();

  _cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });

  return _cloudinary;
};

export const uploadToCloudinary = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.upload(image, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

export const getAllImagesFromFolder = (url) => {
  return new Promise((resolve, reject) => {
    cloudinary()
      .search.expression(url)
      .execute()
      .then((result) => {
        return result ? resolve(result) : reject("[getAllImagesFromFolder] Something went wrong with request")
      }
      );
  });
};

export const deleteFromCloudinary = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.destroy(publicId, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};
