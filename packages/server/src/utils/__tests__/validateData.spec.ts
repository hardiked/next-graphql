import * as yup from "yup";
import { validateData } from "../validateData";

const validationSchema = yup.object().shape({
  email: yup.string().min(3, "Email must have at least 3 characters").email(),
});

describe("#validateData", () => {
  it("retruns all the errors when restrictions are not met", async () => {
    const errors = await validateData(validationSchema, { email: "te" });
    expect(errors).toEqual([
      {
        path: "email",
        message: "Email must have at least 3 characters",
      },
      {
        path: "email",
        message: "email must be a valid email",
      },
    ]);
  });

  it("returns false when all the conditions are met", async () => {
    const errors = await validateData(validationSchema, {
      email: "test@test.com",
    });
    expect(errors).toBeFalsy();
  });
});
