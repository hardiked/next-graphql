import gCall from '../../../test-utils/gCall';

const forgotPasswordMutation = `
  mutation ForgotPassword($email: String!){
    forgotPassword(email: $email)
  }
`;

const callForgotPasswordResolver = async (email: string) =>
  gCall({
    source: forgotPasswordMutation,
    variableValues: {
      email,
    },
  });

export default callForgotPasswordResolver;
