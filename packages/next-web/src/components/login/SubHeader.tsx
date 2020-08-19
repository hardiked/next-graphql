import React from 'react';
import Link from 'next/link';
import Box from '@chakra-ui/core/dist/Box';
import ChakraLink from '@chakra-ui/core/dist/Link';

const SubHeader = () => (
  <Box className="text-center mt-4">
    {"Don't have an account?"}{' '}
    <Link href="/register">
      <ChakraLink className="text-orange-600">Register</ChakraLink>
    </Link>
  </Box>
);

export default SubHeader;
