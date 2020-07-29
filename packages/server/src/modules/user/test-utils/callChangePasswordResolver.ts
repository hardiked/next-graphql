import gCall from '../../../test-utils/gCall';

const changePasswordMutation = `
mutation ChangePassword($data: ChangePasswordInput!){
  changePassword(data:$data){
    error{
      path
      message
    }
  }
}
`;

const callChangePasswordResolver = async (
  password: string,
  confirmPassword: string,
  urlToken: string
) =>
  gCall({
    source: changePasswordMutation,
    variableValues: {
      data: {
        password,
        urlToken,
        confirmPassword,
      },
    },
  });

export default callChangePasswordResolver;
