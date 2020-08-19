import React from 'react';
import {
  Formik,
  Field,
  Form,
  FormikHelpers,
  FormikValues,
  FieldAttributes,
} from 'formik';
import Link from 'next/link';
import Heading from '@chakra-ui/core/dist/Heading';
import Box from '@chakra-ui/core/dist/Box';
import Button from '@chakra-ui/core/dist/Button';
import ChakraLink from '@chakra-ui/core/dist/Link';

interface AuthFormProps<Values> {
  heading: string;
  initialValues: Values;
  onSubmit: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => void | Promise<any>;
  buttonLabel: string;
  config: FieldAttributes<any>[];
  isLoading: boolean;
  SubHeader?: React.FC;
}

const AuthForm = <Values extends FormikValues = FormikValues>(
  props: AuthFormProps<Values>
) => {
  const SubHeader = props.SubHeader;
  return (
    <Box className="sm:bg-gray-100 p-1 sm:bg-cover sm:bg-fixed sm:min-h-screen text-base">
      <Box className="mt-8 m-auto rounded sm:shadow sm:w-3/4 lg:w-1/2 xl:w-1/3 md:bg-white lg:bg-gray">
        <Heading as="h1" className="text-center pt-6">
          {props.heading}
        </Heading>
        {SubHeader ? (
          <Box className="mt-4">
            <SubHeader />
          </Box>
        ) : null}
        <Box className="p-6">
          <Formik onSubmit={props.onSubmit} initialValues={props.initialValues}>
            {({ handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  {props.config.map((field, index) => (
                    <Field
                      key={index}
                      component={field.renderer}
                      {...field.renderOptions}
                    />
                  ))}
                  <Button
                    type="submit"
                    className="mt-4 w-full rounded-lg"
                    variantColor="orange"
                    loadingText="Submitting"
                    isLoading={props.isLoading}
                    data-testid={`${props.buttonLabel}Button`}
                  >
                    {props.buttonLabel}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthForm;
