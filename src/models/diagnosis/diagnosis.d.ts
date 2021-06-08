import { Document } from "mongoose";

export interface IDiagnosis extends Document {
  userId: string;
  diseasesFound?: string[];
  keywordsSearched?: string[];
  userEmail?: string;
  userPhone?: string;
  animal?: string;
  location?: string;
}
