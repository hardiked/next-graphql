import { render, fireEvent, waitFor } from '@testing-library/react';

import AuthForm from '../AuthForm';
import TextField from '../../fields/TextField';
import ThemeProvider from '@chakra-ui/core/dist/ThemeProvider';

const onSubmit = jest.fn();

const setup = (
  isLoading = false,
  initialValues = { email: '', username: '' }
) => {
  const { getByText, getAllByRole, getByPlaceholderText, queryByText } = render(
    <ThemeProvider>
      <AuthForm
        heading="Register"
        buttonLabel="Submit"
        config={[
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
              name: 'username',
              label: 'Username',
              placeholder: 'Enter Username',
            },
          },
        ]}
        initialValues={initialValues}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </ThemeProvider>
  );
  return { getByText, getAllByRole, getByPlaceholderText, queryByText };
};

describe('#AuthForm', () => {
  beforeEach(() => jest.clearAllMocks());
  it('renders auth form', () => {
    const { getByText, getAllByRole, getByPlaceholderText } = setup();

    getByText('Register');
    getByText('Submit');
    expect(getAllByRole('group')).toHaveLength(2);
    getByText('Email');
    getByText('Username');
    getByPlaceholderText('Enter Email');
    getByPlaceholderText('Enter Username');
  });

  it('renders auth form when loading is true', () => {
    const {
      getByText,
      getAllByRole,
      getByPlaceholderText,
      queryByText,
    } = setup(true);

    getByText('Register');
    expect(queryByText('Submit')).toBeNull();
    getByText('Submitting');
    expect(getAllByRole('group')).toHaveLength(2);
    getByText('Email');
    getByText('Username');
    getByPlaceholderText('Enter Email');
    getByPlaceholderText('Enter Username');
  });

  it('renders auth form with correct initial values', () => {
    const { getByPlaceholderText } = setup(true, {
      email: 'test@test.com',
      username: 'test',
    });

    const emailInput = getByPlaceholderText('Enter Email') as HTMLInputElement;
    expect(emailInput.value).toBe('test@test.com');

    const usernameInput = getByPlaceholderText(
      'Enter Username'
    ) as HTMLInputElement;
    expect(usernameInput.value).toBe('test');
  });

  it('calls onSubmit function on clicknig submit button', async () => {
    const { getByText } = setup(false, {
      email: 'test@test.com',
      username: 'test',
    });
    fireEvent.click(getByText('Submit'));
    await waitFor(() => {
      expect(onSubmit).toBeCalledWith(
        { email: 'test@test.com', username: 'test' },
        expect.any(Object)
      );
    });
  });
});
