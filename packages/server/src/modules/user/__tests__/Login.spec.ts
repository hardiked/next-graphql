import "../../../test-utils/oneTimeTestSetup";
import faker from "faker";
import { UserModel } from "../../../models/User";
import { hash } from "bcryptjs";
import { callMeResolver } from "../test-utils/callMeResolver";
import { callLoginResolver } from "../test-utils/callLoginResolver";

const registeredEmail = faker.internet.email();
const password = faker.internet.password();

beforeAll(async () => {
  await new UserModel({
    email: registeredEmail,
    username: faker.internet.userName(),
    password: await hash(password, 12),
  }).save();
});

describe("#LoginResolver", () => {
  it("returns error when login with non-existent email and me returns null", async () => {
    const response = await callLoginResolver(
      faker.internet.email(),
      faker.internet.password()
    );
    expect(response).toEqual({
      data: {
        login: {
          error: [
            {
              path: "email",
              message: "User with this email id does not exist",
            },
          ],
        },
      },
    });
  });

  it("returns error when login with incorrect password", async () => {
    const response = await callLoginResolver(
      registeredEmail,
      faker.internet.password()
    );
    expect(response).toEqual({
      data: {
        login: {
          error: [
            {
              path: "password",
              message: "Password does not match with the email id provided",
            },
          ],
        },
      },
    });
  });

  it("returns user and access token when login with correct combination and me query returns correct user on login", async () => {
    const cookie = jest.fn();
    const response = await callLoginResolver(registeredEmail, password, cookie);
    const accessToken = response.data!.login.accessToken;
    expect(cookie).toBeCalled();
    expect(response).toMatchObject({
      data: {
        login: {
          user: { email: registeredEmail },
        },
      },
    });

    // test meresolvers returns correct user
    const user = await callMeResolver(accessToken);
    expect(user.data!.me.email).toEqual(registeredEmail);
  });
});
