import * as yup from 'yup';
import {
  PasswordValidationSchema,
  ConfirmPasswordValidationSchema,
} from '../../common/PasswordValidationSchema';

const changePasswordValidationSchema = yup.object().shape({
  password: PasswordValidationSchema,
  confirmPassword: ConfirmPasswordValidationSchema,
});

export default changePasswordValidationSchema;
