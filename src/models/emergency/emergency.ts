import { model } from "mongoose";
import { EmergencySchema } from "./emergency.model";
import { IEmergency } from "./emergency.d";

const emergencyModel = model<IEmergency>("emergency", EmergencySchema);
export default emergencyModel;
