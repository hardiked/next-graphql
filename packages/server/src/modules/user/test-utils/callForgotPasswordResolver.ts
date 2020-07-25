import { gCall } from "../../../test-utils/gCall";

const forgotPasswordMutation = `
  mutation ForgotPassword($email: String!){
    forgotPassword(email: $email)
  }
`;

export const callForgotPasswordResolver = async (email: string) =>
  await gCall({
    source: forgotPasswordMutation,
    variableValues: {
      email,
    },
  });
