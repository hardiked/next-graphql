import { Field, InputType } from "type-graphql";
import { PasswordInput } from "../../common/PasswordInput";

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  urlToken: string;

  @Field()
  confirmPassword: string;
}
