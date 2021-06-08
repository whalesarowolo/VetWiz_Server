import SendGridMail from "@sendgrid/mail";
import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import { NextFunction, Response } from "express";
import "dotenv/config";

SendGridMail.setApiKey(process.env.SENDGRID_API_SECRET!);
export const sendMail = async (
  msg: MailDataRequired,
  next: NextFunction
): Promise<void> => {
  await SendGridMail.send(msg)
    .catch((error) => {
      console.log(error)
      // next({ message: "Mail could not be sent", error: error });
    });
};
