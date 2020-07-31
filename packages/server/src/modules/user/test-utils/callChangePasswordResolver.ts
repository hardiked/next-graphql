import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import getApolloTestServer from '../../../test-utils/getApolloTestServer';

const changePasswordMutation = gql`
  mutation ChangePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
      error {
        path
        message
      }
    }
  }
`;

const callChangePasswordResolver = async (
  password: string,
  confirmPassword: string,
  urlToken: string
) => {
  const server = await getApolloTestServer();
  const { mutate } = createTestClient(server as any);
  return mutate({
    mutation: changePasswordMutation,
    variables: {
      data: {
        password,
        urlToken,
        confirmPassword,
      },
    },
  });
};
export default callChangePasswordResolver;
