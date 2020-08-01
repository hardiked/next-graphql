import { createTestClient } from 'apollo-server-testing';
import { gql } from 'apollo-server-express';
import { Response } from 'express';
import getApolloTestServer from '../../../test-utils/getApolloTestServer';

const logoutMutation = gql`
  mutation Logout {
    logout
  }
`;

const callLogoutResolver = async (
  session: Express.Session | undefined,
  clearCookie: (name: string, options?: any) => Response<any>
) => {
  const server = await getApolloTestServer({ session, clearCookie });
  const { mutate } = createTestClient(server as any);
  return mutate({
    mutation: logoutMutation,
  });
};

export default callLogoutResolver;
