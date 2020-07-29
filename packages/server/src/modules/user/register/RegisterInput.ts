import { Field, InputType } from 'type-graphql';
import PasswordInput from '../../common/PasswordInput';

@InputType()
class RegisterInput extends PasswordInput {
  @Field()
  email: string;

  @Field()
  username: string;
}

export default RegisterInput;
