import composeErrorMessage from '../composeErrorMessage';

describe('#composeErrorMessage', () => {
  it('returns object with path and message', () => {
    expect(composeErrorMessage('email', 'Email id is not valid')).toEqual({
      error: [{ path: 'email', message: 'Email id is not valid' }],
    });
  });
});
