import React from 'react';
import { FieldProps } from 'formik';
import FormControl from '@chakra-ui/core/dist/FormControl';
import FormLabel from '@chakra-ui/core/dist/FormLabel';
import Input, { InputProps } from '@chakra-ui/core/dist/Input';
import FormErrorMessage from '@chakra-ui/core/dist/FormErrorMessage';

interface TextFieldProps {
  label: string;
  required?: true;
}

const TextField = ({
  field,
  form: { errors, touched },
  meta: __,
  label,
  ...props
}: FieldProps & InputProps<HTMLInputElement> & TextFieldProps) => {
  const errorMessages =
    touched[field.name] && (errors[field.name] as string | string[]);
  return (
    <FormControl
      className="pt-4"
      isInvalid={!!errorMessages}
      isRequired={props.required}
    >
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} data-testid={field.name} />
      {/* loop over array messages if it is array else directly print that error message */}
      {Array.isArray(errorMessages) ? (
        errorMessages.map(errorMessage => (
          <FormErrorMessage data-testid="errorMessage" key={errorMessage}>
            {errorMessage}
          </FormErrorMessage>
        ))
      ) : (
        <FormErrorMessage data-testid="errorMessage">
          {errorMessages}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default TextField;
