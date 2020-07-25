import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import { UserModel, User } from "../../models/User";
import { Context } from "../../types/Context";
import { isAuthenticated } from "../middleware/isAuthenticated";
import getGraphqlOutputType from "../utils/getGraphqlOutputType";

const MeResponse = getGraphqlOutputType<User>({
  SuccessType: User,
  name: "Me",
});

@Resolver()
export class MeResolver {
  @Query(() => MeResponse, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async me(@Ctx() { payload }: Context): Promise<typeof MeResponse | null> {
    return UserModel.findById(payload.userId);
  }
}
