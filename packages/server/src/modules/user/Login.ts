// lib
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { compare } from 'bcryptjs';

// utils
import getGraphqlOutputType from '../utils/getGraphqlOutputType';
import composeErrorMessage from '../utils/composeErrorMessage';
import { createAccessToken, sendRefreshToken } from '../utils/authUtils';

// types and models
import LoginSuccess from './login/LoginSuccessOutput';
import { Context } from '../../types/Context';
import { UserModel } from '../../models/User';

const LoginResponse = getGraphqlOutputType<LoginSuccess>({
  SuccessType: LoginSuccess,
  name: 'Login',
});

@Resolver()
class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<typeof LoginResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return composeErrorMessage(
        'email',
        'User with this email id does not exist'
      );
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      return composeErrorMessage(
        'password',
        'Password does not match with the email id provided'
      );
    }

    sendRefreshToken(res, user);

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }
}

export default LoginResolver;
