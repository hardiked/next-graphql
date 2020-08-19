import React from 'react';
import Router from 'next/router';
import useToast from '@chakra-ui/core/dist/Toast';

import AuthForm from '../components/AuthForm';
import { initialValues, config } from '../components/register/constant';
import Layout from '../components/Layout';
import {
  useRegisterMutation,
  RegisterMutationVariables,
  RegisterMutation,
} from '../generated/graphql';
import normalizeErrors from '../utils/normalizeYupError';
import SubHeader from '../components/register/SubHeader';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../graphql/user/mutation/register';

const RegisterPage = () => {
  const [mutate, { loading, error }] = useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(REGISTER_MUTATION);
  const toast = useToast();

  const onSubmit = React.useCallback(async (values, { setErrors }) => {
    const { data } = await mutate({ variables: { data: values } });
    console.log(data);
    if (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try after some time',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }

    if (data?.register.__typename === 'Error') {
      return setErrors(normalizeErrors(data.register.error));
    }
    toast({
      title: 'Account created.',
      description: "We've created your account for you. Login and enjoy",
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    Router.push('/login');
    return true;
  }, []);

  return (
    <Layout title="Register">
      <AuthForm
        heading="Create Account"
        buttonLabel="Register"
        initialValues={initialValues}
        onSubmit={onSubmit}
        config={config}
        isLoading={loading}
        SubHeader={SubHeader}
      />
    </Layout>
  );
};

export default RegisterPage;
