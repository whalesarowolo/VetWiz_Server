import express, { Application, Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from "body-parser";
import cors from "cors";
import route from './routes/routesApi';
import "dotenv/config";
import {IUser} from './models/user/user'

declare global {
  namespace Express {
    interface Request {
      userData?: IUser
    }
  }
}

mongoose.connect(
  process.env.MONGODB_URI!, 
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
)

const app: Application = express();

mongoose.Promise = global.Promise
mongoose.connection.on("error", (err) => {
  // eslint-disable-next-line no-console
  console.error(`Database error ${err.message}`)
})


app.set("view engine", "ejs")
app.use(json({ limit: "50mb" }))
app.use(urlencoded({ limit: "50mb", extended: true }))
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
)

app.get("/", (req, res) =>
  res.json({
    message: "Welcome to the FarmAid Server Apis",
  })
)
app.use("/api/v1", route)
// eslint-disable-next-line no-unused-vars


// eslint-disable-next-line import/no-unresolved
require("./utils/modelCreator")

const PORT = process.env.PORT || 8000
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`FarmAid Server listening on port ${PORT}`))