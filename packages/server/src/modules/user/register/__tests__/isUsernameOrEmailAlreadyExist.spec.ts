import "../../../../test-utils/oneTimeTestSetup";
import faker from "faker";
import { UserModel } from "../../../../models/User";
import { isUsernameOrEmailAlreadyExist } from "../isUsernameOrEmailAlreadyExist";

const registeredEmail = faker.internet.email();
const registeredUsername = faker.internet.userName();
const next = jest.fn();

const callMiddleware = async (email: string, username: string) =>
  await isUsernameOrEmailAlreadyExist(
    {
      args: {
        data: {
          email,
          username,
        },
      },
      context: {} as any,
      info: {} as any,
      root: {},
    },
    next
  );

beforeAll(async () => {
  await new UserModel({
    email: registeredEmail,
    username: registeredUsername,
    password: faker.internet.password(),
  }).save();
});

describe("#isUsernameOrEmailAlreadyExist", () => {
  beforeEach(() => jest.clearAllMocks());
  it("returns error when user name is already registered and does not call the next function", async () => {
    const response = await callMiddleware(
      faker.internet.email(),
      registeredUsername
    );
    expect(response).toEqual({
      error: [
        {
          path: "username",
          message: "username already in use",
        },
      ],
    });
    expect(next).not.toBeCalled();
  });

  it("returns error when user name and email already registered and does not call the next function", async () => {
    const response = await callMiddleware(registeredEmail, registeredUsername);
    expect(response).toEqual({
      error: [
        {
          path: "username",
          message: "username already in use",
        },
      ],
    });
    expect(next).not.toBeCalled();
  });

  it("returns error when email is already registered and does not call the next function", async () => {
    const response = await callMiddleware(
      registeredEmail,
      faker.internet.userName()
    );
    expect(response).toEqual({
      error: [
        {
          path: "email",
          message: "email already in use",
        },
      ],
    });
    expect(next).not.toBeCalled();
  });

  it("calls the next function when both email and password are uniques", async () => {
    await callMiddleware(faker.internet.email(), faker.internet.userName());
    expect(next).toBeCalled();
  });
});
