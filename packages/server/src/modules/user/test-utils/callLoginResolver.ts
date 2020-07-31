import { CookieOptions, Response } from 'express';
import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import getApolloTestServer from '../../../test-utils/getApolloTestServer';

const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on Error {
        error {
          path
          message
        }
      }
      ... on LoginSuccess {
        accessToken
        user {
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
) => {
  const server = await getApolloTestServer({ cookie });
  const { mutate } = createTestClient(server as any);
  return mutate({
    mutation: loginMutation,
    variables: {
      email,
      password,
    },
  });
};
export default callLoginResolver;
