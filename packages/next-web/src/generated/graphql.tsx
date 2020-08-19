import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type ErrorType = {
  __typename?: 'ErrorType';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  error: Array<ErrorType>;
};

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  _id: Scalars['ID'];
  userId: User;
};

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  accessToken: Scalars['String'];
  user: User;
};

export type RegisterSuccess = {
  __typename?: 'RegisterSuccess';
  user: User;
};

export type PasswordInput = {
  password: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  urlToken: Scalars['String'];
  confirmPassword: Scalars['String'];
};

export type RegisterInput = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Me>;
  hello: Scalars['String'];
};

export type Me = Error | User;

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<Error>;
  forgotPassword: Scalars['Boolean'];
  login: Login;
  logout: Scalars['Boolean'];
  register: Register;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type Login = Error | LoginSuccess;

export type Register = Error | RegisterSuccess;

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Error' }
    & { error: Array<(
      { __typename?: 'ErrorType' }
      & Pick<ErrorType, 'path' | 'message'>
    )> }
  ) | (
    { __typename?: 'LoginSuccess' }
    & Pick<LoginSuccess, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'email' | 'username'>
    ) }
  ) }
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'Error' }
    & { error: Array<(
      { __typename?: 'ErrorType' }
      & Pick<ErrorType, 'path' | 'message'>
    )> }
  ) | (
    { __typename?: 'RegisterSuccess' }
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | '_id' | 'username'>
    ) }
  ) }
);


export const LoginDocument = gql`
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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
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
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;