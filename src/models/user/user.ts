import mongoose, { Model } from "mongoose";
import { IUser, IUserModel } from "./user.d";
import { UserSchema } from "./user.model";
import { hash, compare } from "bcrypt";

UserSchema.pre<IUserModel>("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  hash(this.password, 9, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function (password: string) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    compare(password, passwordHash, (err: Error, same: boolean): void => {
      if (err) {
        reject(err);
      }
      resolve(same);
    });
  });
};

const userModel: Model<IUserModel> = mongoose.model<IUserModel>(
  "user",
  UserSchema
);
export default userModel;
