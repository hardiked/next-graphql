// lib
import { Resolver, Mutation, Arg } from 'type-graphql';
import { verify } from 'jsonwebtoken';
import { hash } from 'bcryptjs';

// utils
import validateData from '../../utils/validateData';
import { revokeRefrehTokenForUser } from '../utils/authUtils';
import composeErrorMessage from '../utils/composeErrorMessage';

// types and schemas
import ChangePasswordInput from './changePassword/ChangePasswordInput';
import changePasswordValidationSchema from './changePassword/changePasswordValidationSchema';
import Error from '../common/GraphqlErrorType';

// models
import { ForgotPasswordModel } from '../../models/ForgotPassword';
import { UserModel } from '../../models/User';

// TODO: Login the user after password changed successfully..

@Resolver()
class ChangePasswordResolver {
  @Mutation(() => Error, { nullable: true })
  async changePassword(
    @Arg('data') data: ChangePasswordInput
  ): Promise<Error | null> {
    // validate the input
    const error = await validateData(changePasswordValidationSchema, data);
    if (error) {
      return { error };
    }

    const { password, urlToken } = data;
    // find the entry using token
    const forgotPasswordUser = await ForgotPasswordModel.findOne({ urlToken });

    // Entry does not exist in the database user has not requested the reset password at all
    if (!forgotPasswordUser) {
      return composeErrorMessage(
        'user',
        'Something went wrong please try after some time'
      );
    }

    try {
      const payload: any = verify(
        forgotPasswordUser.jwtToken,
        process.env.FORGOT_PASSWORD_TOKEN_SECRET!
      );

      // if jwt token is valid then update the password
      const user = await UserModel.findById(payload.userId);
      if (!user) {
        return composeErrorMessage(
          'user',
          'Something went wrong please try after some time'
        );
      }
      user.password = await hash(password, 12);

      // save the user, delete entry from forgot password collection and revoke access on all the devices user had logged in to
      await Promise.all([
        user.save(),
        forgotPasswordUser.deleteOne(),
        revokeRefrehTokenForUser(user.id),
      ]);
      return null;
    } catch (err) {
      // token is not valid
      console.log(err);
      return composeErrorMessage(
        'user',
        'Session expired please request new email'
      );
    }
  }
}

export default ChangePasswordResolver;
