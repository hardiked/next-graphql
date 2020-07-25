import "../../../test-utils/oneTimeTestSetup";
import faker from "faker";
import { UserModel, User } from "../../../models/User";
import { hash } from "bcryptjs";
import { callForgotPasswordResolver } from "../test-utils/callForgotPasswordResolver";
import { ForgotPasswordModel } from "../../../models/ForgotPassword";
import { callChangePasswordResolver } from "../test-utils/callChangePasswordResolver";
import { callLoginResolver } from "../test-utils/callLoginResolver";

const registeredEmail = faker.internet.email();
const password = faker.internet.password();
let urlToken: string, registeredUser: User | null;

beforeAll(async () => {
  // create the user
  await new UserModel({
    email: registeredEmail,
    username: faker.internet.userName(),
    password: await hash(password, 12),
  }).save();

  // call the forgot password resolver on the same
  await callForgotPasswordResolver(registeredEmail);

  registeredUser = await UserModel.findOne({ email: registeredEmail });
  const forgotPasswordUser = await ForgotPasswordModel.findOne({
    userId: registeredUser!._id,
  });
  urlToken = forgotPasswordUser!.urlToken;
});

describe("#ChangePasswordResolver", () => {
  it("returns error when token is not valid", async () => {
    const password = faker.internet.password();
    const response = await callChangePasswordResolver(
      password,
      password,
      faker.random.alphaNumeric()
    );
    expect(response).toEqual({
      data: {
        changePassword: {
          error: [
            {
              path: "user",
              message: "Something went wrong please try after some time",
            },
          ],
        },
      },
    });
  });

  it("returns error when password is less than 5 character", async () => {
    const password = faker.internet.password(4);
    const response = await callChangePasswordResolver(
      password,
      password,
      urlToken
    );
    expect(response).toEqual({
      data: {
        changePassword: {
          error: [
            {
              path: "password",
              message: "Password must have at least 5 characters",
            },
          ],
        },
      },
    });
  });

  it("returns error when password and confirm password do not match", async () => {
    const response = await callChangePasswordResolver(
      faker.internet.password(5),
      faker.internet.password(5),
      urlToken
    );
    expect(response).toEqual({
      data: {
        changePassword: {
          error: [
            {
              path: "confirmPassword",
              message: "Both password need to be the same",
            },
          ],
        },
      },
    });
  });

  // entire work flow of changing the password
  it("changes password and able to login with new password", async () => {
    // check user is able to login with his old email and password
    const loginResponse = await callLoginResolver(registeredEmail, password);
    expect(loginResponse).toMatchObject({
      data: {
        login: {
          user: {
            email: registeredEmail,
          },
        },
      },
    });

    // change the password
    const newPassword = faker.internet.password();
    const changePasswordResponse = await callChangePasswordResolver(
      newPassword,
      newPassword,
      urlToken
    );
    expect(changePasswordResponse).toEqual({
      data: {
        changePassword: null,
      },
    });

    // does not allow login with old password
    const oldLoginResponse = await callLoginResolver(registeredEmail, password);
    expect(oldLoginResponse).toEqual({
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

    // allows the login with new password
    const newLoginResponse = await callLoginResolver(
      registeredEmail,
      newPassword
    );
    expect(newLoginResponse).toMatchObject({
      data: {
        login: {
          user: {
            email: registeredEmail,
          },
        },
      },
    });

    // delete the entry after process completes
    const forgotPasswordUsers = await ForgotPasswordModel.findOne({
      userId: registeredUser!._id,
    });
    expect(forgotPasswordUsers).toBeNull();
  });
});
