import { YupError } from '../types/yupError';

const normalizeErrors = (errors: YupError[]) => {
  const errMap: { [key: string]: string[] } = {};

  errors.forEach(err => {
    if (!errMap[err.path]) {
      errMap[err.path] = [];
    }
    errMap[err.path].push(err.message);
  });

  return errMap;
};

export default normalizeErrors;
