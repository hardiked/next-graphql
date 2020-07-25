import { gCall } from "../../../test-utils/gCall";

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

export const callMeResolver = async (accessToken?: string) => {
  return await gCall({
    source: meQuery,
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
};
