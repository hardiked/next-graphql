import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ... on Error {
        error {
          path
          message
        }
      }
      ... on LoginSuccess {
        accessToken
        user {
          _id
          email
          username
        }
      }
    }
  }
`;
