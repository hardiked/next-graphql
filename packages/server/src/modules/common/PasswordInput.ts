import { Field, InputType } from 'type-graphql';

@InputType()
class PasswordInput {
  @Field()
  password: string;
}

export default PasswordInput;
