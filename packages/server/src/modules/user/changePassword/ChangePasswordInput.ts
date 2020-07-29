import { Field, InputType } from 'type-graphql';
import PasswordInput from '../../common/PasswordInput';

@InputType()
class ChangePasswordInput extends PasswordInput {
  @Field()
  urlToken: string;

  @Field()
  confirmPassword: string;
}

export default ChangePasswordInput;
