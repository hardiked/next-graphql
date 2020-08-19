import TextField from '../fields/TextField';

export const config = [
  {
    renderer: TextField,
    renderOptions: {
      name: 'username',
      label: 'Username',
      placeholder: 'Enter Username',
      required: true,
    },
  },
  {
    renderer: TextField,
    renderOptions: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      required: true,
    },
  },
  {
    renderer: TextField,
    renderOptions: {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      type: 'password',
      required: true,
    },
  },
];

export const initialValues = {
  email: '',
  username: '',
  password: '',
};
