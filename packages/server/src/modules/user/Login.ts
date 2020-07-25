import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { UserModel } from "../../models/User";
import { compare } from "bcryptjs";
import getGraphqlOutputType from "../utils/getGraphqlOutputType";
import LoginSuccess from "./login/LoginSuccessOutput";
import composeErrorMessage from "../utils/composeErrorMessage";
import { Context } from "../../types/Context";
import { createAccessToken, sendRefreshToken } from "../utils/authUtils";

const LoginResponse = getGraphqlOutputType<LoginSuccess>({
  SuccessType: LoginSuccess,
  name: "Login",
});

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<typeof LoginResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return composeErrorMessage(
        "email",
        "User with this email id does not exist"
      );
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return composeErrorMessage(
        "password",
        "Password does not match with the email id provided"
      );
    }

    sendRefreshToken(res, user);

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }
}
