import { model } from "mongoose";
import { LocationSchema } from "./location.model";
import { ILocation } from "./location.d";

const locationModel = model<ILocation>("location", LocationSchema);
export default locationModel;
