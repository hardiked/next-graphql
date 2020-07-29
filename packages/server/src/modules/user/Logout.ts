import { Resolver, Mutation, Ctx } from 'type-graphql';
import { Context } from '../../types/Context';

// on logging out frontend needs to clear token stored on UI side too.
@Resolver()
class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<Boolean> {
    return new Promise((res, rej) => {
      ctx.req.session!.destroy(err => {
        if (err) {
          console.log(err);
          return rej(false); // eslint-disable-line prefer-promise-reject-errors
        }
        ctx.res.clearCookie('qid');
        return res(true);
      });
    });
  }
}

export default LogoutResolver;
