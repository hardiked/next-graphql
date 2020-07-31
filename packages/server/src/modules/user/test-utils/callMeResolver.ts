import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import getApolloTestServer from '../../../test-utils/getApolloTestServer';

const meQuery = gql`
  query Me {
    me {
      ... on Error {
        error {
          path
          message
        }
      }
      ... on User {
        _id
        email
        username
      }
    }
  }
`;

const callMeResolver = async (accessToken?: string) => {
  const server = await getApolloTestServer({
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  const { query } = createTestClient(server as any);
  return query({
    query: meQuery,
  });
};

export default callMeResolver;
