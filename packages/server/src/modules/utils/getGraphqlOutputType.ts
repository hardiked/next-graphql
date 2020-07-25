import { createUnionType } from "type-graphql";
import Error from "../common/GraphqlErrorType";

export const getGraphqlOutputType = <T>({
  name,
  SuccessType,
}: {
  name: string;
  SuccessType: { new (): T };
}): Error | T =>
  createUnionType({
    name, // the name of the GraphQL union
    types: () => [Error, SuccessType] as const, // function that returns tuple of object types classes
    resolveType: (value) => {
      if ("error" in value) {
        return Error; // we can return object type class (the one with `@ObjectType()`)
      }
      return SuccessType;
    },
  });

export default getGraphqlOutputType;
