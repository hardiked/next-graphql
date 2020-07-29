// lib
import { Resolver, Mutation, Arg } from 'type-graphql';
import { v4 } from 'uuid';

// utils and models
// import { SendEmail } from "../utils/SendEmail";
import { createForgotPasswordToken } from '../utils/authUtils';
import { UserModel } from '../../models/User';
import { ForgotPasswordModel } from '../../models/ForgotPassword';

@Resolver()
class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<Boolean> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return false;
    }

    const urlToken = v4();
    const jwtToken = createForgotPasswordToken(user);

    // check if such entry already exist. i.e. user has already requested the email
    const forgotPasswordUser = await ForgotPasswordModel.findOne({
      userId: user.id,
    });

    if (forgotPasswordUser) {
      forgotPasswordUser.jwtToken = jwtToken;
      forgotPasswordUser.urlToken = urlToken;
      await forgotPasswordUser.save();
    } else {
      await new ForgotPasswordModel({
        urlToken,
        jwtToken,
        userId: user.id,
      }).save();
    }

    // send the email in both the case
    // await SendEmail(
    //   email,
    //   `http://localhost:3000/user/change-password/${urlToken}`
    // );

    return true;
  }
}

export default ForgotPasswordResolver;
