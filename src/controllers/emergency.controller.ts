import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import userModel from "../models/user/user";
import { IAuthModel } from "../utils/auth.d";
import diseaseModel from "../models/disease/disease";
import emergencyModel from "../models/emergency/emergency";

export const saveEmergency = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { emergencyArray } = req.body;
    const { userId }: IAuthModel = req.userData!;
    const userDetails = await userModel.findById(userId).lean();

    Promise.all(
      emergencyArray.map(async (details: any) => {
        const diseaseDetails = await diseaseModel
          .findById(details.diseaseId)
          .lean();
        if (details.notifyAuthorities) {
          let mailOptions = {
            from: "no-reply@vetwiz.app",
            to: "noseji@farmnovation.com, mukam@farmnovation.com",
            subject: "DISEASE NOTIFICTION",
            text: `The details below shows the notifiable disease found by CAHW`,
            html: `
            <h3>A notifiable disease has been discovered</h3>
            <p>This is to notify that the disease with details below was encountered.</p>
            <p>Disease: ${diseaseDetails?.name ?? ""}
            <p>Please find below details of CAHW who initiated this notification.</p>
            <p>Phone: ${userDetails?.phoneNumber ?? ""}
            <p>Phone: ${userDetails?.email ?? ""}
            <p>Longitude: ${details.long}
            <p>Latitude: ${details.lat}
  
            Kind Regards.
            `,
          };

          let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_ADDRESS,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          transport.sendMail(mailOptions);
        }
        await emergencyModel.create({
          userId,
          lat: details.lat,
          long: details.long,
          diseaseId: details.diseaseId,
          notifyAuthorities: details.notifyAuthorities,
        });
      })
    )
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        return next({
          message: "Error Saving emergencies",
          error,
        });
      });
  } catch (error) {
    next({
      message: "Failed to post Data",
      err: error,
    });
  }
};
