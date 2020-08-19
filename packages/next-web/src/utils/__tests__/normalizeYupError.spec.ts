import normalizeErrors from '../normalizeYupError';

describe('#normalizeYupError', () => {
  it('returns error map', () => {
    const errorMap = normalizeErrors([
      {
        path: 'email',
        message: 'Email is not valid',
      },
      {
        path: 'email',
        message: 'Email is too short',
      },
      {
        path: 'password',
        message: 'Password should contain atleast on upper case letter',
      },
    ]);

    expect(errorMap).toEqual({
      email: ['Email is not valid', 'Email is too short'],
      password: ['Password should contain atleast on upper case letter'],
    });
  });
});
