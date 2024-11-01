import { Request, Response, NextFunction } from "express";
import forumModel from "./../models/forum/forum";
import { IForum } from "./../models/forum/forum.d";
import userModel from "../models/user/user";
import { IAuthModel, IPushNotification } from "./../utils/auth.d";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../utils/uploader";
import { isUserAdmin } from "../utils/helpers";
import {
  addForumTopic,
  getFirebaseSnapshot,
  sendPushNotification,
} from "../utils/firebase";
import { UserRoles } from "../models/user/user.d";

/**
 * Add a new forum post.
 * Only admins can post news and adverts.
 */
export const addForumPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { postTitle, postDescription, postType, postPic, postCategory }: IForum = req.body;
    const { userId, userRole }: IAuthModel = req.userData!;
    if (postType === "news" || postType === "adverts") {
      if (userRole.length > 0) {
        if (userRole.includes('admin')) {
          const newPost = await forumModel.create({
            postTitle,
            postDescription,
            postType,
            postCategory: postCategory && postCategory,
            postPic: postPic && postPic,
            postAuthor: userId,
          });
          if (newPost) {
            res.status(200).json({
              message: "Community Post added successfully",
              data: newPost,
            });
            return;
          }
          res.status(500).send({
            message: "Could not add post",
          });
          return;
        }
        res.status(403).send({
          message: "Only admins are allowed to post news and adverts",
        });
      }
      res.status(404).send({
        message: "Author account not found",
      });
      return;
    } else {
      const newPost = await forumModel.create({
        postTitle,
        postDescription,
        postType,
        postCategory: postCategory && postCategory,
        postPic: postPic && postPic,
        postAuthor: userId,
      });
      if (newPost) {
        res.status(200).json({
          message: "Community Post added successfully",
          data: newPost,
        });
        return;
      }
      res.status(500).send({
        message: "Could not add post",
      });
    }
  } catch (error) {
    next({
      message: "Failed to post Data",
      err: error,
    });
  }
};

/**
 * Get all news posts.
 */
export const getNewsPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allPosts = await forumModel
      .find({ postType: "news" })
      .sort(-1)
      .limit(14)
      .lean()
      .exec();
    if (allPosts) {
      res.status(200).json({
        message: "Successful",
        data: allPosts,
      });
      return;
    }
    res.status(404).send({
      message: "No News posts found",
    });
  } catch (error) {
    next({
      message: "Error fetching post",
      err: error,
    });
  }
};

/**
 * Get all adverts posts.
 */
export const getAdvertsPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allPosts = await forumModel
      .find({ postType: "adverts" })
      .sort(-1)
      .limit(14)
      .lean()
      .exec();
    if (allPosts) {
      res.status(200).json({
        message: "Successful",
        data: allPosts,
      });
      return;
    }
    res.status(404).send({
      message: "No Adverts found",
    });
  } catch (error) {
    next({
      message: "Error fetching post",
      err: error,
    });
  }
};

/**
 * Get all community posts.
 */
export const getCommunityPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allPosts = await forumModel
      .find({ postType: "community" })
      .sort(-1)
      .limit(14)
      .lean()
      .exec();
    if (allPosts) {
      res.status(200).json({
        message: "Successful",
        data: allPosts,
      });
      return;
    }
    res.status(404).send({
      message: "No Community posts found",
    });
  } catch (error) {
    next({
      message: "Error fetching post",
      err: error,
    });
  }
};

/**
 * Save a topic image.
 */
export const saveTopicImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.userData!;

    let avatar = req.files?.file as UploadedFile;
    const cloudinaryResponse: any = await uploadFile(
      avatar,
      "image",
      `forum/${email}`
    );
    await res.status(201).json({
      message: "Image uploaded",
      imageUrl: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    console.log(error);
    next({
      message: "Could not upload image",
    });
  }
};

/**
 * Notify users of an admin post.
 */
export const notifyUsersOfAdminPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userRole } = req.userData!;
    const { title, content } = req.body;
    let message: IPushNotification = {
      notification: {
        title: title,
        body: content,
      },
      android: {
        notification: {
          title: title,
          body: content,
        },
        priority: "high",
      },
      topic: "notify",
    };
    if (userRole.includes("admin")) {
      sendPushNotification(message, res);
    }

    res.status(200).send("Notification sent");
  } catch (error) {
    console.log(error);
    next({
      message: "Could not send notification",
    });
  }
};

/**
 * Get all forum topics.
 * Only admins can access this resource.
 */
export const getAllTopics = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId }: IAuthModel = req.userData!;
    const { page, limit } = req.query as any;
    const isAdmin = await isUserAdmin({ _id: userId }, next);
    if (!isAdmin) {
      res.status(403).json({ message: "Only Admins can access this resource" });
      return;
    }

    const topics = await getFirebaseSnapshot("/topics");
    await res.status(200).json(topics ? Object.values(topics.val()) : []);
  } catch (error) {
    console.log(error);
    next({
      message: "Failed to get all topics",
      err: error,
    });
  }
};

/**
 * Create a new forum topic.
 * Only admins can access this resource.
 */
export const createForumTopic = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
      cloudinaryResponse = await uploadFile(avatar, "image", `forum/${email}`);
    }
    const newTopicRef = await addForumTopic();
    const newTopic = {
      title,
      description,
      authorId: userId,
      authorFullname: "Admin",
      status: "approved",
      createdAt: Date.now(),
      ...(cloudinaryResponse && { imageUrl: cloudinaryResponse.secure_url, avatar: 'https://res.cloudinary.com/farm-innovation/image/upload/r_max/c_fill/v1619050667/vetwiz/farmAidLogo_byn24l.png' }),
      topicId: newTopicRef?.key,
    };
    await newTopicRef?.set(newTopic);
    await res.status(201).json({
      message: "Topic Added",
    });
  } catch (error) {
    next({
      message: "Failed to create topic",
      err: error,
    });
  }
};