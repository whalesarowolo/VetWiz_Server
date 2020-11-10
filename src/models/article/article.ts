import { model } from "mongoose";
import { IArticle } from "./article.d";
import { ArticleSchema } from "./article.model";

const articleModel = model<IArticle>("article", ArticleSchema);
export default articleModel;
