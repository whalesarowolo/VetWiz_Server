import { Request, Response, NextFunction } from "express";
import { IUser, IUserModel } from "../models/user/user.d";
import userModel from "../models/user/user";
import { newToken } from "./../utils/auth";
import walletModel from "./../models/wallet/wallet";
import { IAuthModel } from "../utils/auth.d";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { createTransport } from "nodemailer";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<object | void> => {
  try {
    const {
      email,
      phoneNumber,
      password,
      occupation,
      category,
      firstName,
      lastName,
      gender,
      state,
    } = req.body;
    let user = null;
    user = await userModel.findOne({ phoneNumber }).lean().exec();
    if (user) {
      return res.status(403).json({
        message: `${phoneNumber} already exists`,
      });
    }
    user = await userModel.findOne({ email }).lean().exec();
    if (user) {
      return res.status(403).json({
        message: `${email} already exists`,
      });
    }
    const newUser = await userModel.create({
      email,
      phoneNumber,
      password,
      userRole: occupation,
      fname: firstName,
      lname: lastName,
      gender,
      ...(state && { state }),
      ...(category && { bizCategory: category }),
    });
    if (newUser) {
      const newWallet = await walletModel.create({
        balance: String(5 * 100),
        user: newUser._id,
      });
      const token = newToken(newUser);
      const val = newUser.toObject();
      if (val) {
        const { password: p, ...rest } = val;
        return res.status(201).json({
          message: "Created  successfully",
          token,
          data: {
            ...rest,
            wallet: newWallet.toObject(),
          },
        });
      }
    }
  } catch (err) {
    console.log(err)
    return next({
      message: "Registration failed",
      error: err,
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, phoneNumber, password }: IUser = req.body;
    let user: IUserModel | null = null;
    if (email) {
      user = await userModel.findOne({ email });
    } else if (phoneNumber && phoneNumber.length > 9) {
      user = await userModel.findOne({
        phoneNumber: { $regex: phoneNumber, $options: "i" },
      });
    }
    if (!user) {
      res.status(401).json({
        message: "Wrong username or password",
      });
    }
    if (user) {
      const match = await user.checkPassword(password!);
      if (!match) {
        res.status(401).json({
          message: "Wrong username or password",
        });
      }
    }

    if (user) {
      const token = newToken(user);
      const { password: p, ...rest } = user.toObject();
      res.status(200).json({
        message: "Login successful",
        token,
        data: rest,
      });
    }
  } catch (error) {
    return next({
      message: "Login failed",
      error: error,
    });
  }
};

export const updateFullName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { firstName, lastName } = req.body;
    const { userId }: IAuthModel = req.userData!;
    const newUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(firstName && { fname: firstName }),
          ...(lastName && { lname: lastName }),
        },
      },
      { new: true }
    );
    if (newUser) {
      const { password: p, ...rest } = newUser.toObject();
      res.status(200).json(rest);
    }
  } catch (error) {
    return next({
      message: "Login failed",
      error: error,
    });
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId }: IAuthModel = req.userData!;
    const newUser = await userModel.findById(userId)
    res.status(200).json(newUser)
  } catch (err) {
    next({
      message: "Error checking user",
      error: err,
    });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        message:
          "Please ensure you have the correct email and try again in 3 minutes",
      });
    } else {
      const token = sign({ user: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // send the email
      let transport = createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      let mailOptions = {
        from: "no-reply@vetwiz.ap",
        to: `${user.email}`,
        subject: "Link To Reset Password",
        text: `
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link to complete the process within one hour of receiving it:\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.,
          `,
        html: `
        <!doctype html><html xmlns=http://www.w3.org/1999/xhtml xmlns:o=urn:schemas-microsoft-com:office:office xmlns:v=urn:schemas-microsoft-com:vml><meta content="text/html; charset=utf-8"http-equiv=Content-Type><meta content="width=device-width"name=viewport><meta content="IE=edge"http-equiv=X-UA-Compatible><style>body{margin:0;padding:0}table,td,tr{vertical-align:top;border-collapse:collapse}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}</style><style id=media-query>@media (max-width:520px){.block-grid,.col{min-width:320px!important;max-width:100%!important;display:block!important}.block-grid{width:100%!important}.col{width:100%!important}.col>div{margin:0 auto}img.fullwidth,img.fullwidthOnMobile{max-width:100%!important}.no-stack .col{min-width:0!important;display:table-cell!important}.no-stack.two-up .col{width:50%!important}.no-stack .col.num4{width:33%!important}.no-stack .col.num8{width:66%!important}.no-stack .col.num4{width:33%!important}.no-stack .col.num3{width:25%!important}.no-stack .col.num6{width:50%!important}.no-stack .col.num9{width:75%!important}.video-block{max-width:none!important}.mobile_hide{min-height:0;max-height:0;max-width:0;display:none;overflow:hidden;font-size:0}.desktop_hide{display:block!important;max-height:none!important}}</style><body class=clean-body style=margin:0;padding:0;-webkit-text-size-adjust:100%;background-color:#fff><table cellpadding=0 cellspacing=0 class=nl-container role=presentation style="table-layout:fixed;vertical-align:top;min-width:320px;Margin:0 auto;border-spacing:0;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;width:100%"valign=top width=100% bgcolor=#FFFFFF><tr style=vertical-align:top valign=top><td style=word-break:break-word;vertical-align:top valign=top><div style=background-color:transparent><div style="Margin:0 auto;min-width:320px;max-width:500px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent"class=block-grid><div style=border-collapse:collapse;display:table;width:100%;background-color:transparent><div style=min-width:320px;max-width:500px;display:table-cell;vertical-align:top;width:500px class="col num12"><div style=width:100%!important><div style="border-top:0 solid transparent;border-left:0 solid transparent;border-bottom:0 solid transparent;border-right:0 solid transparent;padding-top:5px;padding-bottom:5px;padding-right:0;padding-left:0"><div style="color:#555;font-family:'Lucida Sans Unicode','Lucida Grande','Lucida Sans',Geneva,Verdana,sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px"><div style="font-family:'Lucida Sans Unicode','Lucida Grande','Lucida Sans',Geneva,Verdana,sans-serif;font-size:12px;line-height:14px;color:#555"><p style=font-size:14px;line-height:16px;text-align:center;margin:0><strong><span style=font-size:22px;line-height:26px>Reset Password</span></strong></div></div><table cellpadding=0 cellspacing=0 class=divider role=presentation style=table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;min-width:100%;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100% valign=top width=100% border=0><tr style=vertical-align:top valign=top><td style=word-break:break-word;vertical-align:top;min-width:100%;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px valign=top class=divider_inner><table cellpadding=0 cellspacing=0 class=divider_content role=presentation style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;width:100%;border-top:1px dotted #bbb;h
        eight:0"valign=top width=100% border=0 align=center height=0><tr style=vertical-align:top valign=top><td style=word-break:break-word;vertical-align:top;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100% valign=top height=0><span></span></table></table></div></div></div></div></div></div><div style=background-color:transparent><div style="Margin:0 auto;min-width:320px;max-width:500px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent"class=block-grid><div style=border-collapse:collapse;display:table;width:100%;background-color:transparent><div style=min-width:320px;max-width:500px;display:table-cell;vertical-align:top;width:500px class="col num12"><div style=width:100%!important><div style="border-top:0 solid transparent;border-left:0 solid transparent;border-bottom:0 solid transparent;border-right:0 solid transparent;padding-top:5px;padding-bottom:5px;padding-right:0;padding-left:0"><div style="color:#555;font-family:'Lucida Sans Unicode','Lucida Grande','Lucida Sans',Geneva,Verdana,sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px"><div style="font-family:'Lucida Sans Unicode','Lucida Grande','Lucida Sans',Geneva,Verdana,sans-serif;font-size:12px;line-height:14px;color:#555"><p style=font-size:14px;line-height:16px;text-align:center;margin:0>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'If you did not request this, please ignore this email and your password will remain unchanged.\n<p style=font-size:14px;line-height:16px;text-align:center;margin:0><p style=font-size:14px;line-height:16px;text-align:center;margin:0><p style=font-size:14px;line-height:16px;margin:0></div></div><div style=padding-top:15px;padding-right:15px;padding-bottom:15px;padding-left:15px class=button-container align=center><a href=${process.env.BASE_URL}api/v1/user/reset-password/${user._id}/${token} style="-webkit-text-size-adjust:none;text-decoration:none;display:inline-block;color:#fff;background-color:#3aaee0;border-radius:20px;-webkit-border-radius:20px;-moz-border-radius:20px;width:auto;width:auto;border-top:1px solid #3aaee0;border-right:1px solid #3aaee0;border-bottom:1px solid #3aaee0;border-left:1px solid #3aaee0;padding-top:10px;padding-bottom:10px;font-family:'Lucida Sans Unicode','Lucida Grande','Lucida Sans',Geneva,Verdana,sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all"target=_blank><span style=padding-left:20px;padding-right:20px;font-size:16px;display:inline-block><span style=font-size:16px;line-height:32px>Reset Password</span></span></a></div><table cellpadding=0 cellspacing=0 class=divider role=presentation style=table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;min-width:100%;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100% valign=top width=100% border=0><tr style=vertical-align:top valign=top><td style=word-break:break-word;vertical-align:top;min-width:100%;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px valign=top class=divider_inner><table cellpadding=0 cellspacing=0 class=divider_content role=presentation style="table-layout:fixed;vertical-align:top;border-spacing:0;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;width:100%;border-top:1px dotted #bbb;height:0"valign=top width=100% border=0 align=center height=0><tr style=vertical-align:top valign=top><td style=word-break:break-word;vertical-align:top;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100% valign=top height=0><span></span></table></table></div></div></div></div></div></div><div style=background-color:transparent><div style="Margin:0 auto;min-width:320px;max-width:500px;overflow
        -wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent"class=block-grid><div style=border-collapse:collapse;display:table;width:100%;background-color:transparent><div style=min-width:320px;max-width:500px;display:table-cell;vertical-align:top;width:500px class="col num12"><div style=width:100%!important><div style="border-top:0 solid transparent;border-left:0 solid transparent;border-bottom:0 solid transparent;border-right:0 solid transparent;padding-top:5px;padding-bottom:5px;padding-right:0;padding-left:0"><div style="color:#555;font-family:'Lucida Sans Unicode','Lucida Grande','Lucida Sans',Geneva,Verdana,sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px"><div style="font-family:'Lucida Sans Unicode','Lucida Grande','Lucida Sans',Geneva,Verdana,sans-serif;font-size:12px;line-height:14px;color:#555"><p style=font-size:12px;line-height:14px;text-align:center;margin:0>Please do not reply to this email.<p style=font-size:12px;line-height:14px;text-align:center;margin:0><p style=font-size:12px;line-height:14px;text-align:center;margin:0>The Barefoot Nomad Team.<p style=font-size:12px;line-height:14px;text-align:center;margin:0>Copyright© 2019 (Storm Team). All rights reserved.</div></div></div></div></div></div></div></div></table>
          `,
      };

      transport.sendMail(mailOptions, (err, response) => {
        if (err) {
          next({
            message: "Sending forgot password link failed",
            error: err,
          });
        } else {
          res.status(200).json({ message: "recovery email sent" });
        }
      });
    }
  } catch (err) {
    next({
      message: "Sending forgot password link not successful",
      error: err,
    });
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId }: IAuthModel = req.userData!;
    const { newPassword } = req.body;
    hash(newPassword, 9, (err, hash) => {
      if (err) {
        return next({
          message: "Generating encryption failed",
          error: err,
        });
      }

      const password = hash;
      userModel.findByIdAndUpdate(
        userId,
        {
          $set: { password },
        },
        { new: true },
        async (error, user) => {
          if (error) {
            return next({
              message: "Updating user password failed",
              error,
            });
          }
          if (user) {
            res.status(201).json({
              message: "Your password is updated, Please login again.",
            });
          }
        }
      );
    });
  } catch (error) {
    return next({
      message: "Updating Password failed",
      error,
    });
  }
};
