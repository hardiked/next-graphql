import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      ... on Error {
        error {
          path
          message
        }
      }
      ... on RegisterSuccess {
        user {
          email
          _id
          username
        }
      }
    }
  }
`;
