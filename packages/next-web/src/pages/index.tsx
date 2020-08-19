import React from 'react';
import Link from 'next/link';
import { Input } from '@chakra-ui/core';

import Layout from '../components/Layout';

const IndexPage = () => {
  const [value, setValue] = React.useState('Hello');

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1 className="m-1">Hello React driven framework Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <Input
        value={value}
        onChange={event => setValue(event.currentTarget.value)}
        placeholder="Enter Email"
      />
    </Layout>
  );
};

export default IndexPage;
