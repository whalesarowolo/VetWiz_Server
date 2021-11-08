import { Response } from "express";
import firebaseAdmin from "firebase-admin";
import { IPushNotification } from "./auth.d";

const serviceAccount = {
  development: {
    location: require("../../firebase-dev.json"),
    databaseURL: "https://vetwiz-debug-testing-default-rtdb.firebaseio.com",
  },
  production: {
    location: require("../../firebase-prod.json"),
    databaseURL: "https://vetwiz-dev-default-rtdb.firebaseio.com",
  },
};

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    serviceAccount[process.env.NODE_ENV].location
  ),
  databaseURL: serviceAccount[process.env.NODE_ENV].databaseURL,
});

export const addFirebaseDocument = async (
  eventPath: string,
  data: { [key: string]: any } | string | number
) => {
  await firebaseAdmin.database().ref(eventPath).push().set(data);
};

export const removeFirebaseDocument = async (eventPath: string) => {
  await firebaseAdmin.database().ref(eventPath).remove();
};

export const getFirebaseSnapshot = async (eventPath: string) => {
  return firebaseAdmin.database().ref(eventPath).once("value");
};

export const sendPushNotification = (
  message: IPushNotification,
  res: Response
) => {
  firebaseAdmin
    .messaging()
    .send(message)
    .then((resp) => {
      res.json({
        message: "Successful",
        resp,
      });
    })
    .catch((err) => console.log(err));
};

export const subscribeToTopic = (topic: string) => {};

export const addForumTopic = async () => {
  try {
    return await firebaseAdmin.database().ref("topics").push();
  } catch (error) {
    console.log(error);
  }
};

export const addBlogTopic = async () => {
  try {
    return await firebaseAdmin.database().ref("blogs").push();
  } catch (error) {
    console.log(error);
  }
};
