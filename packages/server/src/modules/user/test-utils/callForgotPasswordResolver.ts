import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import getApolloTestServer from '../../../test-utils/getApolloTestServer';

const forgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

const callForgotPasswordResolver = async (email: string) => {
  const server = await getApolloTestServer();
  const { mutate } = createTestClient(server as any);
  return mutate({
    mutation: forgotPasswordMutation,
    variables: {
      email,
    },
  });
};

export default callForgotPasswordResolver;
