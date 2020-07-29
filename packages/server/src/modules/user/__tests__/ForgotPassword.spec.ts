import { hash } from 'bcryptjs';
import '../../../test-utils/oneTimeTestSetup';
import faker from 'faker';
import { UserModel } from '../../../models/User';
import { ForgotPasswordModel } from '../../../models/ForgotPassword';
import callForgotPasswordResolver from '../test-utils/callForgotPasswordResolver';
import '../ForgotPassword';

const registeredEmail = faker.internet.email();
const password = faker.internet.password();

beforeAll(async () => {
  await new UserModel({
    email: registeredEmail,
    username: faker.internet.userName(),
    password: await hash(password, 12),
  }).save();
});

describe('#ForgotPasswordResolver', () => {
  it('returns false when email is not registered', async () => {
    const response = await callForgotPasswordResolver(faker.internet.email());
    expect(response).toEqual({
      data: {
        forgotPassword: false,
      },
    });
  });

  it('returns true when email is registered', async () => {
    const response = await callForgotPasswordResolver(registeredEmail);
    expect(response).toEqual({
      data: {
        forgotPassword: true,
      },
    });
  });

  it('makes only one entry in database on multiple request with same email id', async () => {
    // first request for mail
    await callForgotPasswordResolver(registeredEmail);
    // second request for mail
    await callForgotPasswordResolver(registeredEmail);

    // check that only one entry is made for this user
    const user = await UserModel.findOne({ email: registeredEmail });
    const forgotPasswordUser = await ForgotPasswordModel.find({
      userId: user!.id,
    });
    expect(forgotPasswordUser).toHaveLength(1);
  });
});
