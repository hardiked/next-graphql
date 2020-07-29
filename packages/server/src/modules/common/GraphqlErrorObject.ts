import { ObjectType, Field } from 'type-graphql';

@ObjectType()
class ErrorType {
  @Field()
  path: string;

  @Field()
  message: string;
}

export default ErrorType;
