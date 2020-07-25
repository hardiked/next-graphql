import { gCall } from "../../../test-utils/gCall";
import { CookieOptions, Response } from "express";

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

export const callLoginResolver = async (
  email: string,
  password: string,
  cookie?: (name: string, val: string, options: CookieOptions) => Response<any>
) =>
  await gCall({
    source: loginMutation,
    variableValues: {
      email,
      password,
    },
    cookie,
  });
