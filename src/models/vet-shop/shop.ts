import { model } from "mongoose";
import { ShopSchema } from "./shop.model";
import { IShop } from "./shop.d";

const shopModel = model<IShop>("vetShop", ShopSchema);
export default shopModel;
