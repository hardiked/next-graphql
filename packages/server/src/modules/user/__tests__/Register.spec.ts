import faker from 'faker';
import { UserModel } from '../../../models/User';
import '../../../test-utils/oneTimeTestSetup';
import callRegisterResolver from '../test-utils/callRegisterResolver';
import '../Register';

const checkUser = async (response: any, user: any) => {
  // compare response
  expect(response).toMatchObject({
    data: {
      register: {
        user: {
          email: user.email,
          username: user.username,
        },
      },
    },
  });

  // check user exist in database
  const dbUser = await UserModel.findOne({ email: user.email });
  expect(dbUser).not.toBeNull();
  expect(dbUser!.email).toEqual(user.email);
  expect(dbUser!.username).toEqual(user.username);
  // should save the password in hashed format
  expect(dbUser!.password).not.toEqual(user.password);
};

describe('#RegisterResolver', () => {
  it('returns error when email is not valid', async () => {
    const response = await callRegisterResolver({
      email: 'test',
      password: faker.internet.password(),
      username: faker.internet.userName(),
    });
    expect(response.data).toEqual({
      register: {
        error: [{ path: 'email', message: 'Email is not valid' }],
      },
    });
  });

  it('returns error when email is already in use', async () => {
    const email = faker.internet.email();
    await new UserModel({
      email,
      password: faker.internet.password(),
      username: faker.internet.userName(),
    }).save();

    // call the register mutation with the same email id
    const response = await callRegisterResolver({
      email,
      password: faker.internet.password(),
      username: faker.internet.userName(),
    });
    expect(response.data).toEqual({
      register: {
        error: [{ path: 'email', message: 'Email already in use' }],
      },
    });
  });

  it('returns error when username is already in use', async () => {
    const username = faker.internet.userName();
    await new UserModel({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username,
    }).save();

    // call the register mutation with the same email id
    const response = await callRegisterResolver({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username,
    });
    expect(response.data).toEqual({
      register: {
        error: [{ path: 'username', message: 'Username already in use' }],
      },
    });
  });

  it('returns error when password length is less than 5', async () => {
    const response = await callRegisterResolver({
      email: faker.internet.email(),
      password: faker.internet.password(4),
      username: faker.internet.userName(),
    });
    expect(response.data).toEqual({
      register: {
        error: [
          {
            path: 'password',
            message: 'Password must have at least 5 characters',
          },
        ],
      },
    });
  });

  it('returns error when username is less than 3 characters long', async () => {
    // call the register mutation with the same email id
    const response = await callRegisterResolver({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: 'ts',
    });
    expect(response.data).toEqual({
      register: {
        error: [
          {
            path: 'username',
            message: 'Username must have at least 3 characters',
          },
        ],
      },
    });
  });

  it('returns all the errors in one go', async () => {
    // call the register mutation with the same email id
    const response = await callRegisterResolver({
      email: faker.internet.email(),
      password: faker.internet.password(4),
      username: 'ts',
    });
    expect(response.data).toEqual({
      register: {
        error: [
          {
            path: 'password',
            message: 'Password must have at least 5 characters',
          },
          {
            path: 'username',
            message: 'Username must have at least 3 characters',
          },
        ],
      },
    });
  });

  it('returns user when password is exactly 5 characters long', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(5),
      username: faker.internet.userName(),
    };
    const response = await callRegisterResolver(user);

    // check response user is created in database
    await checkUser(response, user);
  });

  it('returns user when everything is valid', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(6),
      username: faker.internet.userName(),
    };
    const response = await callRegisterResolver(user);

    // check response and user is created in database
    await checkUser(response, user);
  });
});
