import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  email: string;

  @Field()
  @Property({ required: true })
  username: string;

  @Property({ required: true })
  password: string;

  @Property({ default: 0 })
  version: number;
}

export const UserModel = getModelForClass(User);
