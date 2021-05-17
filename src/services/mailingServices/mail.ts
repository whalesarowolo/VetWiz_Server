import SendGridMail from "@sendgrid/mail";
import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import { NextFunction, Response } from "express";
import "dotenv/config";

SendGridMail.setApiKey(process.env.SENDGRID_API_SECRET!);
export const sendMail = async (
  msg: MailDataRequired,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await SendGridMail.send(msg)
    .then(() => {
      return res.status(201).json({ message: "Mail sent" });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "Mail could not be sent", error: error });
    });
};
