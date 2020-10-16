import { Request, Response, NextFunction } from 'express';
import forumModel from './../models/forum/forum';
import { IForum } from './../models/forum/forum.d';
import userModel from '../models/user/user';
import { IAuthModel } from './../utils/auth.d';

export const addForumPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { postTitle, postDescription, postType, postPic, postCategory }: IForum = req.body
    const { userId }: IAuthModel = req.userData!
    if ((postType === "news") || (postType === "adverts")) {
      const author = await userModel.findOne({ userId }).lean().exec()
      console.log(userId)
      if (author) {
        const { userRole } = author
        if (userRole.includes('admin')) {
          const newPost = await forumModel.create({
            postTitle,
            postDescription,
            postType,
            postCategory: postCategory && postCategory,
            postPic: postPic && postPic,
            postAuthor: userId
          })
          if (newPost) {
            res.status(200).json({
              message: "Community Post added succesfully",
              data: newPost
            })
            return
          }
          res.status(500).send({
            message: "Could not add post"
          })
          return
        }
        res.status(403).send({
          message: "Only amins are allowed to post news and adverts"
        })

      }
      res.status(404).send({
        message: "Author account not found"
      })
      return
    } else {
      const newPost = await forumModel.create({
        postTitle,
        postDescription,
        postType,
        postCategory: postCategory && postCategory,
        postPic: postPic && postPic,
        postAuthor: userId
      })
      if (newPost) {
        res.status(200).json({
          message: "Community Post added succesfully",
          data: newPost
        })
        return
      }
      res.status(500).send({
        message: "Could not add post"
      })
    }
  } catch (error) {
    next({
      message: "Failed to post Data",
      err: error
    })
  }
}

export const getNewsPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allPosts = await forumModel.find({postType: "news"})
    .sort(-1)
    .limit(14)
    .lean()
    .exec()
    if(allPosts) {
      res.status(200).json({
        message: "Successful",
        data: allPosts
      })
      return
    }
    res.status(404).send({
      message: "No News posts found"
    })
    
  } catch (error) {
    next({
      message: "Error fetching post",
      err: error
    })
  }
}

export const getAdvertsPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allPosts = await forumModel.find({postType: "adverts"})
    .sort(-1)
    .limit(14)
    .lean()
    .exec()
    if(allPosts) {
      res.status(200).json({
        message: "Successful",
        data: allPosts
      })
      return
    }
    res.status(404).send({
      message: "No Adverts found"
    })
    
  } catch (error) {
    next({
      message: "Error fetching post",
      err: error
    })
  }
}

export const getCommunityPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const allPosts = await forumModel.find({postType: "community"})
    .sort(-1)
    .limit(14)
    .lean()
    .exec()
    if(allPosts) {
      res.status(200).json({
        message: "Successful",
        data: allPosts
      })
      return
    }
    res.status(404).send({
      message: "No Community posts found"
    })
    
  } catch (error) {
    next({
      message: "Error fetching post",
      err: error
    })
  }
}

// export const deleteForumPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const 
//   } catch (error) {
//     next({
//       message: "Could not delete post"
//     })
//   }
// }