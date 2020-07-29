import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { User, UserModel } from '../../models/User';
import composeErrorMessage from './composeErrorMessage';

export const createAccessToken = (user: User) =>
  sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });

export const createRefreshToken = (user: User) =>
  sign(
    { userId: user._id, version: user.version },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );

export const createForgotPasswordToken = (user: User) =>
  sign({ userId: user._id }, process.env.FORGOT_PASSWORD_TOKEN_SECRET!, {
    expiresIn: '30m',
  });

export const sendRefreshToken = (res: Response, user: User) =>
  res.cookie('qid', createRefreshToken(user), { httpOnly: true });

export const revokeRefrehTokenForUser = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    return composeErrorMessage('user', 'User does not exist');
  }
  user.version += 1;
  await user.save();
  return true;
};
