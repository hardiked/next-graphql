import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';

import { useApollo } from '../lib/apolloClient';
import '../styles/index.css';
import chakraTheme from '../theme/chakraTheme';

const App = ({ Component, pageProps }: any) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={chakraTheme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
