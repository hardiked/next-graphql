// lib
import { MiddlewareFn } from 'type-graphql';
import { verify } from 'jsonwebtoken';

// utils
import composeErrorMessage from '../utils/composeErrorMessage';

// types
import { Context } from '../../types/Context';

const isAuthenticated: MiddlewareFn<Context> = async ({ context }, next) => {
  const { authorization } = context.req.headers;
  if (!authorization) {
    return composeErrorMessage(
      'user',
      'You are not authenticated to perform this action'
    );
  }
  try {
    const token = authorization?.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    return composeErrorMessage(
      'user',
      'You are not authenticated to perform this action'
    );
  }
  return next();
};

export default isAuthenticated;
