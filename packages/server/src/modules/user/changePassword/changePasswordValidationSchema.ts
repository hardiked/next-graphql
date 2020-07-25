import * as yup from "yup";
import {
  PasswordValidationSchema,
  ConfirmPasswordValidationSchema,
} from "../../common/PasswordValidationSchema";

export const changePasswordValidationSchema = yup.object().shape({
  password: PasswordValidationSchema,
  confirmPassword: ConfirmPasswordValidationSchema,
});
