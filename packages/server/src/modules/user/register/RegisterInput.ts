import { Field, InputType } from "type-graphql";
import { PasswordInput } from "../../common/PasswordInput";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  email: string;

  @Field()
  username: string;
}
