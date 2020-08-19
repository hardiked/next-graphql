import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@chakra-ui/core';

import TextField from '../TextField';

const setup = (touched = {}, errors = {}) => {
  const { getByTestId, getByText, queryByTestId, getAllByTestId } = render(
    <ThemeProvider>
      <TextField
        label="Email"
        field={{
          name: 'email',
          onBlur: jest.fn(),
          onChange: jest.fn(),
          value: '',
        }}
        // @ts-ignore
        form={{
          touched,
          errors,
        }}
      />
    </ThemeProvider>
  );
  return { getByTestId, getByText, queryByTestId, getAllByTestId };
};

describe('#TextField', () => {
  it('renders TextField with label and input', () => {
    const { getByText, getByTestId } = setup();
    getByTestId('email');
    getByText('Email');
  });

  it('should not render error when not exist on given name', () => {
    const { getByTestId, getByText, queryByTestId } = setup(
      { password: true },
      { password: 'Password must have at least 5 characters' }
    );
    getByTestId('email');
    getByText('Email');
    expect(queryByTestId('errorMessage')).toBeNull();
  });

  it('should render error message when it is string', () => {
    const { getByTestId } = setup(
      { email: true },
      { email: 'Email is not valid' }
    );
    expect(getByTestId('errorMessage')).not.toBeNull();
  });

  it('should render all the error messages when error array is passed', () => {
    const { getAllByTestId } = setup(
      { email: true },
      { email: ['Email is not valid', 'Email must be atleast 3 characters'] }
    );
    expect(getAllByTestId('errorMessage')).toHaveLength(2);
  });

  it('should not render error when the field is touched but no error', () => {
    const { queryByTestId } = setup({ email: true });
    expect(queryByTestId('errorMessage')).toBeNull();
  });
});
