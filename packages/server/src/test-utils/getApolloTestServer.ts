import { GraphQLSchema } from 'graphql';
import { Response, CookieOptions } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { Maybe } from 'graphql/jsutils/Maybe';
import createSchema from '../utils/createSchema';

interface Options {
  clearCookie?: (name: string, options?: any) => Response<any>;
  cookie?: (name: string, val: string, options: CookieOptions) => Response<any>;
  headers?: Maybe<{
    [key: string]: any;
  }>;
  session?: Express.Session | undefined;
}

let schema: GraphQLSchema;

export const getApolloTestServer = async ({
  clearCookie = () => {
    return {} as Response<any>;
  },
  cookie = () => {
    return {} as Response<any>;
  },
  headers,
  session,
}: Options = {}) => {
  if (!schema) {
    schema = await createSchema();
  }
  const req = {
    headers,
    session,
  };
  const res = {
    clearCookie,
    cookie,
  };
  const server = new ApolloServer({
    schema,
    context: () => ({ req, res }),
  });
  return server;
};

export default getApolloTestServer;
