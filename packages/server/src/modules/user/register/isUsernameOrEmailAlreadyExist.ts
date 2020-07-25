import { MiddlewareFn } from "type-graphql";
import { Context } from "../../../types/Context";
import composeErrorMessage from "../../utils/composeErrorMessage";
import { UserModel } from "../../../models/User";

export const isUsernameOrEmailAlreadyExist: MiddlewareFn<Context> = async (
  { args },
  next
) => {
  for (const field of ["username", "email"]) {
    const user = await UserModel.findOne({ [field]: args.data[field] });
    if (user) {
      return composeErrorMessage(field, `${field} already in use`);
    }
  }
  return next();
};
