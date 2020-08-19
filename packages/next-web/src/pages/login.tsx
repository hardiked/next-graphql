import React from 'react';

import AuthForm from '../components/AuthForm';
import { initialValues, config } from '../components/login/constant';
import Layout from '../components/Layout';
import { useLoginMutation } from '../generated/graphql';
import normalizeErrors from '../utils/normalizeYupError';
import SubHeader from '../components/login/SubHeader';

const RegisterPage = () => {
  const [login, { loading }] = useLoginMutation();

  const onSubmit = React.useCallback(
    async ({ email, password }, { setErrors }) => {
      const { data } = await login({ variables: { email, password } });
      if (data?.login.__typename === 'Error') {
        return setErrors(normalizeErrors(data.login.error));
      }
      return true;
    },
    []
  );

  return (
    <Layout title="Register">
      <AuthForm
        heading="Login"
        buttonLabel="Login"
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
