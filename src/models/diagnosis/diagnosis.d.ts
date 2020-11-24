import { Document } from "mongoose";

export interface IDiagnosis extends Document {
  diseasesFound?: string[];
  keywordsSearched?: string[];
  userEmail?: string;
  userPhone?: string;
  animal?: string;
}
