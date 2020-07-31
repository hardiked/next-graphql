import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import getApolloTestServer from '../../../test-utils/getApolloTestServer';

const registerMutation = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      ... on Error {
        error {
          path
          message
        }
      }
      ... on RegisterSuccess {
        user {
          email
          _id
          username
        }
      }
    }
  }
`;

const callRegisterResolver = async (user: {
  email: string;
  password: string;
  username: string;
}) => {
  const server = await getApolloTestServer();
  const { mutate } = createTestClient(server as any);
  return mutate({
    mutation: registerMutation,
    variables: {
      data: user,
    },
  });
};

export default callRegisterResolver;
