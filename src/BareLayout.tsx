import React from 'react'
import Head from 'next/head'
import { Box, Text } from '@chakra-ui/react'

const responsivePadding = { base: '1rem', md: '1.5rem' }

function BareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title key="title">Pathway</title>

        <meta
          key="viewport"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />

        <link
          key="favicon"
          rel="shortcut icon"
          href="/favicon.png"
          type="image/x-icon"
        ></link>
      </Head>

      <Box padding={responsivePadding} maxW="1000px" mx="auto">{children}</Box>
    </>
  )
}

export default BareLayout