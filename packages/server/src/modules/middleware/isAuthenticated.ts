import { MiddlewareFn } from "type-graphql";
import { Context } from "../../types/Context";
import { verify } from "jsonwebtoken";
import composeErrorMessage from "../utils/composeErrorMessage";

export const isAuthenticated: MiddlewareFn<Context> = async (
  { context },
  next
) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    return composeErrorMessage(
      "user",
      "You are not authenticated to perform this action"
    );
  }
  try {
    const token = authorization?.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    return composeErrorMessage(
      "user",
      "You are not authenticated to perform this action"
    );
  }
  return next();
};
