
import fs from "fs";
import "dotenv/config";
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'farm-innovation',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export const uploadFile = (file: any, resourceType: any, fileCategory: any) =>
  new Promise((resolve, reject) => {
    const newFilename = uuidv4();
    file.mv(`${__dirname}/${newFilename}-${file.name}`, (err: Error) => {
      if (err) {
        reject(err);
      }

      cloudinary.uploader
        .upload(`${__dirname}/${newFilename}-${file.name}`, {
          folder: `Vetwiz/${fileCategory}`,
          use_filename: true,
          resource_type: resourceType,
        })
        .then((result: any) => {
          fs.unlink(`${__dirname}/${newFilename}-${file.name}`, () => {
            resolve(result);
          });
        })
        .catch((err: Error) => {
          fs.unlink(`${__dirname}/${newFilename}-${file.name}`, () => {
            reject(err);
          });
        });
    });
  });

export const deleteFile = (public_id: string): Promise<void> =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (err: Error, result: any): void => {
      resolve(result);
    });
  });
