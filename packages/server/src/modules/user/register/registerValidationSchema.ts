import * as yup from 'yup';
import EmailValidationSchema from '../../common/EmailValidationSchema';
import { PasswordValidationSchema } from '../../common/PasswordValidationSchema';

const registerValidationSchema = yup.object().shape({
  email: EmailValidationSchema,
  password: PasswordValidationSchema,
  username: yup
    .string()
    .min(3, 'Username must have at least 3 characters')
    .required('This field is required'),
});

export default registerValidationSchema;
