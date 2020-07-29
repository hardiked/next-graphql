import * as yup from 'yup';

export const PasswordValidationSchema = yup
  .string()
  .min(5, 'Password must have at least 5 characters')
  .required('This field is required');

export const ConfirmPasswordValidationSchema = yup
  .string()
  .oneOf([yup.ref('password')], 'Both password need to be the same')
  .required();
