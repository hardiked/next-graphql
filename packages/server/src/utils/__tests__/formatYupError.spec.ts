import { ValidationError } from 'yup';
import formatYupError from '../formatYupError';

describe('#formatYupError', () => {
  it('returns the formatted error from yup error', () => {
    const errors = formatYupError({
      inner: [
        {
          path: 'email',
          message: 'Email is not valid',
        },
        {
          path: 'password',
          message: 'Password must be atleast 5 character',
        },
      ],
    } as ValidationError);
    expect(errors).toEqual([
      {
        path: 'email',
        message: 'Email is not valid',
      },
      {
        path: 'password',
        message: 'Password must be atleast 5 character',
      },
    ]);
  });
});
