import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ObjectType, ID } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class ForgotPassword {
  @Field(() => ID)
  readonly _id: ObjectId;

  @Property({ required: true })
  urlToken: string;

  @Property({ required: true })
  jwtToken: string;

  @Field(() => User)
  @Property({ ref: User, required: true })
  userId: Ref<User>;
}

export const ForgotPasswordModel = getModelForClass(ForgotPassword);
