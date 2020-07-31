import callMeResolver from '../test-utils/callMeResolver';
import '../Me';

describe('#MeResolver', () => {
  it('returns error when token is not valid', async () => {
    const response = await callMeResolver('snajsnxas');
    expect(response.data).toEqual({
      me: {
        error: [
          {
            path: 'user',
            message: 'You are not authenticated to perform this action',
          },
        ],
      },
    });
  });

  it('returns null when no token is passed', async () => {
    const response = await callMeResolver();
    expect(response.data).toEqual({
      me: {
        error: [
          {
            path: 'user',
            message: 'You are not authenticated to perform this action',
          },
        ],
      },
    });
  });
});
