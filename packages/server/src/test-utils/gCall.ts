import { graphql, GraphQLSchema } from 'graphql';
import { Response, CookieOptions } from 'express';
import { Maybe } from 'graphql/jsutils/Maybe';
import createSchema from '../utils/createSchema';

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  clearCookie?: (name: string, options?: any) => Response<any>;
  cookie?: (name: string, val: string, options: CookieOptions) => Response<any>;
  headers?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

const gCall = async ({
  source,
  variableValues,
  clearCookie = () => {
    return {} as Response<any>;
  },
  cookie = () => {
    return {} as Response<any>;
  },
  headers,
}: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        headers,
      },
      res: {
        clearCookie,
        cookie,
      },
    },
  });
};

export default gCall;
