import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import { UserModel } from "../../models/User";
import { RegisterInput } from "./register/RegisterInput";
import { hash } from "bcryptjs";
import getGraphqlOutputType from "../utils/getGraphqlOutputType";
import RegisterSuccess from "./register/RegisterSuccessOutput";
import { isUsernameOrEmailAlreadyExist } from "./register/isUsernameOrEmailAlreadyExist";
import { registerValidationSchema } from "./register/registerValidationSchema";
import { validateData } from "../../utils/validateData";

const RegisterResponse = getGraphqlOutputType<RegisterSuccess>({
  SuccessType: RegisterSuccess,
  name: "Register",
});

@Resolver()
export class RegisterResolver {
  @Mutation(() => RegisterResponse)
  @UseMiddleware(isUsernameOrEmailAlreadyExist)
  async register(
    @Arg("data") data: RegisterInput
  ): Promise<typeof RegisterResponse> {
    // validate the input
    const error = await validateData(registerValidationSchema, data);
    if (error) {
      return { error };
    }

    const { email, password, username } = data;
    const hashedPassword = await hash(password, 12);
    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return { user };
  }
}
