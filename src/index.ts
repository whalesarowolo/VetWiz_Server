import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import route from "./routes/routesApi";
import "dotenv/config";
import { IUserModel } from "./models/user/user.d";
import { IAuthModel } from "./utils/auth.d";
import morgan from "morgan";
import * as Sentry from "@sentry/node";

declare global {
  namespace Express {
    interface Request {
      userData?: IAuthModel;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      PAYSTACK_SK: string;
      JWT_SECRET: string;
      NODE_ENV: string;
      BASE_URL: string;
      SENDGRID_API_SECRET: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_SECRET: string;
    }
  }
}

mongoose.connect(process.env.MONGODB_URI!, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app: Application = express();

(<any>mongoose).Promise = global.Promise;
mongoose.connection.on("error", (err) => {
  // eslint-disable-next-line no-console
  console.error(`Database error ${err.message}`);
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev") as any);
}

Sentry.init({
  dsn: "https://8011920eb693416baa7c96f196c4f3f8@sentry.io/5170539",
});

app.set("view engine", "ejs");
app.use(json({ limit: "50mb" }));
app.use(urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  }) as any
);

app.get("/", (req, res) =>
  res.json({
    message: "Welcome to the Vetwiz Server Apis",
  })
);
app.use("/api/v1", route);
// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line import/no-unresolved
// require("./utils/modelCreator")

app.use(
  (
    serverError: { error: Error; message?: string },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Sentry.configureScope((scope: any) => {
      scope.setTag("user", req?.userData ?? "");
      scope.setUser({
        email: req.userData && req.userData.email ? req.userData.email : "",
        phone: req?.userData?.phoneNumber ?? "",
      });
    });

    Sentry.captureException(serverError.error);
    res.status(500).json({
      message: serverError.message,
    });
  }
);

const PORT = process.env.PORT || 8000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Vetwiz Server listening on port ${PORT}`));
