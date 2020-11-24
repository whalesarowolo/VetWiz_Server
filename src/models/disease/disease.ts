import { model } from "mongoose";
import { IDisease } from "./disease.d";
import { DiseaseSchema } from "./disease.model";

const diseaseModel = model<IDisease>("disease", DiseaseSchema);
export default diseaseModel;
