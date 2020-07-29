import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql';

import getGraphqlOutputType from '../utils/getGraphqlOutputType';
import { Context } from '../../types/Context';
import isAuthenticated from '../middleware/isAuthenticated';
import { UserModel, User } from '../../models/User';

const MeResponse = getGraphqlOutputType<User>({
  SuccessType: User,
  name: 'Me',
});

@Resolver()
class MeResolver {
  @Query(() => MeResponse, { nullable: true })
  @UseMiddleware(isAuthenticated)
  async me(@Ctx() { payload }: Context): Promise<typeof MeResponse | null> {
    return UserModel.findById(payload.userId);
  }
}

export default MeResolver;
