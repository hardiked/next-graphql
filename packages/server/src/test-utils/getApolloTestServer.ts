import { GraphQLSchema } from 'graphql';
import { Response, CookieOptions } from 'express';
import { Maybe } from 'graphql/jsutils/Maybe';
import createSchema from '../utils/createSchema';
import { ApolloServer } from 'apollo-server-express';

interface Options {
  clearCookie?: (name: string, options?: any) => Response<any>;
  cookie?: (name: string, val: string, options: CookieOptions) => Response<any>;
  headers?: Maybe<{
    [key: string]: any;
  }>;
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
}: Options = {}) => {
  if (!schema) {
    schema = await createSchema();
  }
  const req = {
      headers,
    },
    res = {
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
