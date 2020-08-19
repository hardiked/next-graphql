import TextField from '../fields/TextField';

export const config = [
  {
    renderer: TextField,
    renderOptions: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
    },
  },
  {
    renderer: TextField,
    renderOptions: {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      type: 'password',
    },
  },
];

export const initialValues = {
  email: '',
  password: '',
};
