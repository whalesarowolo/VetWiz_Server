import { Request, Response, NextFunction } from "express";
import blogModel from "./../models/blog/blog";
import { IBlog } from "./../models/blog/blog.d";
import userModel from "../models/user/user";
import { IAuthModel, IPushNotification } from "./../utils/auth.d";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../utils/uploader";
import { isUserAdmin } from "../utils/helpers";
import {
  addBlogTopic,
  getFirebaseSnapshot,
  sendPushNotification,
} from "../utils/firebase";
import { UserRoles } from "../models/user/user.d";

export const addBlogPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { blogTitle, blogDescription }: IBlog = req.body
    const { userId, userRole }: IAuthModel = req.userData!
    if (userRole.length > 0) {
      if (userRole.includes('admin')) {
        const newPost = await blogModel.create({
          blogTitle,
          blogDescription,
          blogAuthor: userId,
        });
        if (newPost) {
          res.status(200).json({
            message: "Blog Post added succesfully",
            data: newPost,
          });
          return;
        }
        res.status(500).send({
          message: "Could not add blog post",
        });
        return;
      }
      res.status(403).send({
        message: "Only amins are allowed to post news and adverts",
      });
    }
    res.status(404).send({
      message: "Author account not found",
    });
    return;
  } catch (error) {
    next({
      message: "Failed to post Data",
      err: error,
    });
  }
};



export const createBlogTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, email }: IAuthModel = req.userData!;
    const isAdmin = await isUserAdmin({ _id: userId }, next);
    if (!isAdmin) {
      res.status(403).json({ message: "Only Admins can access this resource" });
      return;
    }
    const { values } = req.body;
    const { title, description } = JSON.parse(values);
    let avatar = req.files?.file as UploadedFile;
    let cloudinaryResponse;
    if (avatar) {
      cloudinaryResponse = await uploadFile(avatar, "image", `blog/${email}`);
    }
    const newTopicRef = await addBlogTopic();
    const newTopic = {
      title,
      description,
      authorId: userId,
      authorFullname: "Admin",
      status: "approved",
      ...(cloudinaryResponse && { imageUrl: cloudinaryResponse.secure_url, avatar: 'https://res.cloudinary.com/farm-innovation/image/upload/r_max/c_fill/v1619050667/vetwiz/farmAidLogo_byn24l.png'  }),
      topicId: newTopicRef?.key,
    };
    await newTopicRef?.set(newTopic);
    await res.status(201).json({
      message: "Blog Post Added",
    });
  } catch (error) {
    next({
      message: "Failed to create Blog Post",
      err: error,
    });
  }
};