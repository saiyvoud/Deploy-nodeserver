import cloudinary from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
} from "./globalKey.js";

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const UploadImage = async (image, oldImage) => {
  try {
    if (!image) return "";
    if (oldImage) {
      const spliturl = oldImage.split("/");
      const img_id = spliturl[spliturl.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(img_id);
    }
    const res_upload = await cloudinary.uploader.upload(image, null, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    console.log(res_upload.url);
    return res_upload.url;
  } catch (err) {
    console.log(err)
    return "";
  }
};
const UploadImageFormData = async (image, oldImage) => {
  try {
    if (!image) return "";
    if (oldImage) {
      const spliturl = oldImage.split("/");
      const img_id = spliturl[spliturl.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(img_id);
    }
    const res_upload = await cloudinary.uploader.upload(image, null, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    console.log(res_upload.url);
    return res_upload.url;
  } catch (err) {
    console.log(err)
    return "";
  }
};
// export default UploadImageFormData;
export default UploadImage;