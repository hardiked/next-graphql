import { graphql, GraphQLSchema } from "graphql";
import { createSchema } from "../utils/createSchema";
import { Maybe } from "graphql/jsutils/Maybe";
import { Response, CookieOptions } from "express";

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

export const gCall = async ({
  source,
  variableValues,
  clearCookie = jest.fn(),
  cookie = jest.fn(),
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
