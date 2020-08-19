import React from 'react';
import Link from 'next/link';
import Box from '@chakra-ui/core/dist/Box';
import ChakraLink from '@chakra-ui/core/dist/Link';

const SubHeader = () => (
  <Box className="text-center mt-4">
    Already have an account?{' '}
    <Link href="/login">
      <ChakraLink className="text-orange-600">Login</ChakraLink>
    </Link>
  </Box>
);

export default SubHeader;
