const composeErrorMessage = (path: string, message: string) => ({
  error: [
    {
      path,
      message,
    },
  ],
});

export default composeErrorMessage;
