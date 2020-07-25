import { ObjectType, Field } from "type-graphql";
import { User } from "../../../models/User";

@ObjectType()
class RegisterSuccess {
  @Field()
  user: User;
}

export default RegisterSuccess;
