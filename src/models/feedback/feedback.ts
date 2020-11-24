import { model } from "mongoose";
import { FeedbackSchema } from "./feedback.model";
import { IFeedback } from "./feedback.d";

const feedbackModel = model<IFeedback>("feedback", FeedbackSchema);
export default feedbackModel;
