import { ObjectType, Field } from 'type-graphql';
import { User } from '../../../models/User';

@ObjectType()
class LoginSuccess {
  @Field()
  accessToken: string;

  @Field()
  user: User;
}

export default LoginSuccess;
