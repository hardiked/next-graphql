import '../../../test-utils/oneTimeTestSetup';
import faker from 'faker';
import { UserModel } from '../../../models/User';
import isAuthenticated from '../isAuthenticated';
import { createAccessToken } from '../../utils/authUtils';

let accessToken: string;
beforeAll(async () => {
  const user = new UserModel({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  });
  await user.save();

  accessToken = createAccessToken(user);
});

const next = jest.fn();
const callMiddleware = async (token?: string) =>
  isAuthenticated(
    {
      args: {},
      context: {
        req: {
          headers: {
            authorization: token,
          },
        },
      } as any,
      info: {} as any,
      root: {},
    },
    next
  );

describe('#isAuthenticated', () => {
  beforeEach(() => jest.clearAllMocks());
  it('returns error when token is not passed', async () => {
    const response = await callMiddleware();
    expect(response).toEqual({
      error: [
        {
          path: 'user',
          message: 'You are not authenticated to perform this action',
        },
      ],
    });
    expect(next).not.toBeCalled();
  });

  it('returns error when token is not passed without bearer word', async () => {
    const response = await callMiddleware(accessToken);
    expect(response).toEqual({
      error: [
        {
          path: 'user',
          message: 'You are not authenticated to perform this action',
        },
      ],
    });

    expect(next).not.toBeCalled();
  });

  it('returns error when token is passed with bearer but it is invalid', async () => {
    const response = await callMiddleware(`bearer ${faker.random.word()}`);
    expect(response).toEqual({
      error: [
        {
          path: 'user',
          message: 'You are not authenticated to perform this action',
        },
      ],
    });

    expect(next).not.toBeCalled();
  });

  it('returns error when valid token is passed', async () => {
    await callMiddleware(`bearer ${accessToken}`);
    expect(next).toBeCalled();
  });
});
