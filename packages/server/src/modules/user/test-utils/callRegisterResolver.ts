import gCall from '../../../test-utils/gCall';

const registerMutation = `
  mutation Register($data: RegisterInput!){
    register(data:$data){
      ...on Error{
        error{
          path
          message
        }
      }
      ...on RegisterSuccess{
        user{
          email
          _id
          username
        }
      }
    }
  }
`;

const callRegisterResolver = async (user: {
  email: string;
  password: string;
  username: string;
}) =>
  gCall({
    source: registerMutation,
    variableValues: {
      data: user,
    },
  });

export default callRegisterResolver;
