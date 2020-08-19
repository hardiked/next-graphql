import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import RegisterPage from '../pages/register';
import { REGISTER_MUTATION } from '../graphql/user/mutation/register';
import { ThemeProvider } from '@chakra-ui/core';

describe('#register page', () => {
  it('renders', async () => {
    const mocks = [
      {
        request: {
          query: REGISTER_MUTATION,
          variables: {
            data: {
              email: '',
              password: '',
              username: '',
            },
          },
        },
        result: {
          data: {
            register: {
              error: [
                {
                  path: 'email',
                  message: 'Email already in use',
                },
              ],
              __typename: 'Error',
            },
          },
        },
      },
    ];
    const { getByTestId, getByText, debug } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThemeProvider>
          <RegisterPage />
        </ThemeProvider>
      </MockedProvider>
    );
    fireEvent.click(getByTestId('RegisterButton'));
    // await waitFor(() => {
    //   debug();
    //   getByText('Submitting');
    // });
    await new Promise(resolve => setTimeout(resolve, 0));
    // debug();
  });
});
