import { model } from "mongoose";
import { DiseaseSchema } from "./diagnosis.model";
import { IDiagnosis } from "./diagnosis.d";

const diagnosisModel = model<IDiagnosis>("diagnosis", DiseaseSchema);
export default diagnosisModel;
