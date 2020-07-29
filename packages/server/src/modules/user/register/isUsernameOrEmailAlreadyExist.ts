import { MiddlewareFn } from 'type-graphql';
import { Context } from '../../../types/Context';
import composeErrorMessage from '../../utils/composeErrorMessage';
import { UserModel } from '../../../models/User';

const isUsernameOrEmailAlreadyExist: MiddlewareFn<Context> = async (
  { args },
  next
) => {
  const { email, username } = args.data;
  const user = await UserModel.findOne({ $or: [{ email }, { username }] });
  if (user) {
    if (user.username === username) {
      return composeErrorMessage('username', 'Username already in use');
    }
    if (user.email === email) {
      return composeErrorMessage('email', 'Email already in use');
    }
  }
  return next();
};

export default isUsernameOrEmailAlreadyExist;
