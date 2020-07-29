import { CookieOptions, Response } from 'express';
import gCall from '../../../test-utils/gCall';

const loginMutation = `
mutation Login($email: String!, $password: String!){
  login(email:$email, password: $password){
    ...on Error{
      error{
        path
        message
      }
    }
    ...on LoginSuccess{
      accessToken
      user{
        _id
        email
        username
      }
    }
  }
}
`;

const callLoginResolver = async (
  email: string,
  password: string,
  cookie?: (name: string, val: string, options: CookieOptions) => Response<any>
) =>
  gCall({
    source: loginMutation,
    variableValues: {
      email,
      password,
    },
    cookie,
  });

export default callLoginResolver;
