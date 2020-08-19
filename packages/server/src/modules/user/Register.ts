// lib
import { Resolver, Mutation, Arg, UseMiddleware, Query } from 'type-graphql';
import { hash } from 'bcryptjs';

// utils
import validateData from '../../utils/validateData';
import getGraphqlOutputType from '../utils/getGraphqlOutputType';

// types, middleware and schema
import RegisterInput from './register/RegisterInput';
import RegisterSuccess from './register/RegisterSuccessOutput';
import isUsernameOrEmailAlreadyExist from './register/isUsernameOrEmailAlreadyExist';
import registerValidationSchema from './register/registerValidationSchema';

// models
import { UserModel } from '../../models/User';

const RegisterResponse = getGraphqlOutputType<RegisterSuccess>({
  SuccessType: RegisterSuccess,
  name: 'Register',
});

@Resolver()
class RegisterResolver {
  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => RegisterResponse)
  @UseMiddleware(isUsernameOrEmailAlreadyExist)
  async register(
    @Arg('data') data: RegisterInput
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

export default RegisterResolver;
