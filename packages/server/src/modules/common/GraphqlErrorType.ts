import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class ErrorType {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
class Error {
  @Field(() => [ErrorType])
  error: ErrorType[];
}

export default Error;
