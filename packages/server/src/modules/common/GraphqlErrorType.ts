import { ObjectType, Field } from 'type-graphql';
import ErrorType from './GraphqlErrorObject';

@ObjectType()
class Error {
  @Field(() => [ErrorType])
  error: ErrorType[];
}

export default Error;
