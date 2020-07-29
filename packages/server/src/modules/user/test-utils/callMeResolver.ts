import gCall from '../../../test-utils/gCall';

const meQuery = `
  query Me{
    me{
      ...on Error{
        error{
          path
          message
        }
      }
      ...on User{
        _id
        email
        username
      }
    }
  }`;

const callMeResolver = async (accessToken?: string) =>
  gCall({
    source: meQuery,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

export default callMeResolver;
