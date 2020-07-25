import * as yup from "yup";

export const EmailValidationSchema = yup
  .string()
  .min(3, "Email must be atleast 3 characters")
  .email("Email is not valid")
  .required("This field is required");
