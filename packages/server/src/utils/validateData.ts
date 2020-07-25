import { formatYupError } from "./formatYupError";
import * as yup from "yup";

export const validateData = async <T extends object>(
  validationSchema: yup.ObjectSchema<yup.Shape<object | undefined, T>>,
  data: T
) => {
  try {
    await validationSchema.validate(data, { abortEarly: false });
  } catch (err) {
    return formatYupError(err);
  }
  return false;
};
